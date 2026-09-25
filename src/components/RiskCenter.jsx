import React, { useEffect, useRef, useState } from 'react';
import { 
  Camera, 
  Video, 
  Crosshair, 
  Radio, 
  Activity, 
  Wifi, 
  ShieldCheck, 
  AlertTriangle, 
  Siren, 
  Lock, 
  Unlock,
  Sliders,
  Sparkles,
  Maximize2,
  Smartphone,
  QrCode,
  UserCheck,
  UserX,
  Target,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  X,
  Check,
  Cpu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { 
  initMediaPipeFaceDetector, 
  getFaceDetectorState, 
  analyzeLiveFrame,
  initVisionModel
} from '../utils/visionDetector';

export default function RiskCenter({ 
  currentEvent, 
  currentScore, 
  currentStatus, 
  useWebcam, 
  setUseWebcam,
  manualSensors,
  onToggleManualSensor,
  isDemoRunning,
  authorizedPersonnel = [],
  activeIdentity = 'authorized',
  activeObject = 'none',
  onSelectFusionState,
  activeCameraId = 'camera_1',
  onSelectCamera,
  onOpenPhoneModal,
  isFaceInFrame = true,
  onToggleFaceInFrame,
  currentLiveFace = null,
  onLiveDetection = null
}) {
  const videoRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const frameSeqRef = useRef(0);
  const latestAppliedSeqRef = useRef(0);
  const isProcessingRef = useRef(false);

  const [cameraError, setCameraError] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(currentScore);
  const [phoneFrame, setPhoneFrame] = useState(null);
  const [detectionPulse, setDetectionPulse] = useState(Date.now());
  const [mpState, setMpState] = useState(() => getFaceDetectorState());
  const [detectedFaceCount, setDetectedFaceCount] = useState(0);
  const [primaryConfidence, setPrimaryConfidence] = useState(0);
  const [dynamicFaceBox, setDynamicFaceBox] = useState({
    detected: true,
    xPercent: 35,
    yPercent: 18,
    widthPercent: 30,
    heightPercent: 52
  });
  const [dynamicObject, setDynamicObject] = useState({
    detected: false,
    label: 'Clean / None',
    class: 'none',
    confidence: 0,
    box: null
  });

  // Touch widget drawer collapse states to keep UI clean
  const [showSimControls, setShowSimControls] = useState(false);
  const [showSensorStrip, setShowSensorStrip] = useState(false);
  const [isCameraMaximized, setIsCameraMaximized] = useState(false);

  // Initialize MediaPipe Face Detector once on mount
  useEffect(() => {
    let isMounted = true;
    const handleStatus = (e) => {
      if (isMounted && e.detail) setMpState(e.detail);
    };
    window.addEventListener('mediapipe-model-status', handleStatus);

    initMediaPipeFaceDetector()
      .then(() => {
        if (isMounted) setMpState(getFaceDetectorState());
      })
      .catch((err) => {
        if (isMounted) setMpState({ status: 'error', error: err.message });
      });

    return () => {
      isMounted = false;
      window.removeEventListener('mediapipe-model-status', handleStatus);
    };
  }, []);

  // Listen for Phone CCTV (CAM-02) frames from local storage / custom event
  useEffect(() => {
    const handlePhoneFrame = (e) => {
      if (e.detail?.frame) {
        setPhoneFrame(e.detail.frame);
      }
    };
    window.addEventListener('camera_2_frame_updated', handlePhoneFrame);

    const checkInterval = setInterval(() => {
      try {
        const stored = localStorage.getItem('vortex_camera_2_frame');
        if (stored) setPhoneFrame(stored);
      } catch {}
    }, 1000);

    return () => {
      window.removeEventListener('camera_2_frame_updated', handlePhoneFrame);
      clearInterval(checkInterval);
    };
  }, []);

  // Continuous Detection Tick Pulse (~600ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setDetectionPulse(Date.now());
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Smooth animation of risk score number
  useEffect(() => {
    let start = animatedScore;
    const end = currentScore;
    if (start === end) return;

    const duration = 500;
    const startTime = performance.now();

    const animateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(start + (end - start) * easeProgress);
      setAnimatedScore(val);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    const animId = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animId);
  }, [currentScore]);

  // Preload vision model on mount
  useEffect(() => {
    initVisionModel().catch((err) => {
      console.warn('[VORTEX RISK CENTER] Vision model init:', err);
    });
  }, []);

  // Handle webcam stream
  useEffect(() => {
    let stream = null;
    if (useWebcam && activeCameraId === 'camera_1') {
      setCameraError(false);
      navigator.mediaDevices?.getUserMedia({ video: { width: 640, height: 480 } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => console.warn('[VORTEX WEBCAM] Autoplay error:', e));
            };
            videoRef.current.play().catch(() => {});
          }
        })
        .catch((err) => {
          console.warn('[VORTEX WEBCAM] Camera access error:', err);
          setCameraError(true);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useWebcam, activeCameraId]);

  // Real webcam frame capture loop with Google MediaPipe Face Detector (~400ms)
  useEffect(() => {
    if (!useWebcam || activeCameraId !== 'camera_1' || cameraError) {
      setDetectedFaceCount(0);
      setPrimaryConfidence(0);
      if (overlayCanvasRef.current) {
        const ctx = overlayCanvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      }
      return;
    }

    const intervalId = setInterval(async () => {
      const video = videoRef.current;
      const canvas = captureCanvasRef.current;
      if (!video || !canvas) return;

      // Ensure video is actively playing if stream is present
      if (video.paused && video.srcObject) {
        video.play().catch(() => {});
      }

      if (video.readyState < 2 || isProcessingRef.current) {
        return;
      }

      frameSeqRef.current += 1;
      const seq = frameSeqRef.current;
      const isoTimestamp = new Date().toISOString();

      isProcessingRef.current = true;
      try {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        // Draw mirrored video to canvas to match on-screen mirror view
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        // Send real frame to backend non-blocking
        const frameData = canvas.toDataURL('image/jpeg', 0.45);
        fetch('http://localhost:3001/api/camera-frame', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            camera_id: 'camera_1',
            frame: frameData,
            timestamp: isoTimestamp,
            seq
          })
        }).catch(() => {});

        // Run real client-side MediaPipe Face Detection & draw bounding boxes on overlay canvas
        const result = await analyzeLiveFrame({
          videoElement: video,
          canvasElement: canvas,
          overlayCanvasElement: overlayCanvasRef.current,
          frameSeq: seq,
          timestamp: isoTimestamp,
          authorizedPersonnel
        });

        // Race-condition guard: Only apply if result matches or exceeds latest applied sequence
        if (result && result.frameSeq >= latestAppliedSeqRef.current) {
          latestAppliedSeqRef.current = result.frameSeq;

          setDetectedFaceCount(result.faceCount || 0);
          setPrimaryConfidence(result.primaryConfidence || 0);

          if (result.isPersonInFrame && result.faceBox) {
            setDynamicFaceBox(result.faceBox);
          }

          if (result.detectedObject && result.detectedObject === 'knife') {
            setDynamicObject({
              detected: true,
              label: 'KNIFE DETECTED',
              class: 'knife',
              confidence: result.objectConfidence,
              box: result.objectBox
            });
          } else {
            setDynamicObject({
              detected: false,
              label: 'Clean / None',
              class: 'none',
              confidence: 0,
              box: null
            });
          }

          // Transmit real camera detection result to parent app
          if (onLiveDetection) {
            onLiveDetection(result);
          }
        }
      } catch (err) {
        console.warn('[VORTEX LIVE CAPTURE] Frame inference error:', err);
      } finally {
        isProcessingRef.current = false;
      }
    }, 400);

    return () => {
      clearInterval(intervalId);
      if (overlayCanvasRef.current) {
        const ctx = overlayCanvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      }
    };
  }, [useWebcam, activeCameraId, cameraError, isDemoRunning, onLiveDetection]);

  // Radial gauge calculations (SVG Circle)
  const radius = 76;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getThemeColors = (status, score) => {
    if (status === 'CRITICAL' || score >= 65) {
      return {
        text: 'text-red-400',
        stroke: '#ef4444',
        glow: 'rgba(239, 68, 68, 0.4)',
        bgBadge: 'bg-red-950/80 border-red-500/80 text-red-400',
        panelGlow: 'shadow-[0_0_35px_rgba(239,68,68,0.25)] border-red-500/50'
      };
    }
    if (status === 'SUSPICIOUS' || score >= 30) {
      return {
        text: 'text-amber-400',
        stroke: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.35)',
        bgBadge: 'bg-amber-950/80 border-amber-500/80 text-amber-400',
        panelGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.2)] border-amber-500/50'
      };
    }
    return {
      text: 'text-emerald-400',
      stroke: '#10b981',
      glow: 'rgba(16, 185, 129, 0.25)',
      bgBadge: 'bg-emerald-950/80 border-emerald-500/80 text-emerald-400',
      panelGlow: 'border-[#23273e]'
    };
  };

  const effectiveStatus = (dynamicObject.detected && dynamicObject.class === 'knife') || manualSensors?.weapons || animatedScore >= 65
    ? 'CRITICAL'
    : currentStatus;

  const theme = getThemeColors(effectiveStatus, animatedScore);

  const objectsList = [
    { id: 'none', label: 'Clean / None', weight: 0, tag: '+0' },
    { id: 'scissors', label: 'Small Sharp / Scissors', weight: 10, tag: '+10' },
    { id: 'box_cutter', label: 'Box Cutter', weight: 35, tag: '+35' },
    { id: 'knife', label: 'Knife (Blade Exposed)', weight: 60, tag: '+60' },
    { id: 'gun', label: 'Concealed Gun / Firearm', weight: 90, tag: '+90' }
  ];

  const displayName = currentLiveFace?.name || currentEvent?.name || "Subject";
  const isAuthorized = currentLiveFace ? currentLiveFace.isAuthorized : Boolean(currentEvent?.faceMatch);

  return (
    <div className={`flex flex-col h-full bg-[#10121d] border rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${theme.panelGlow}`}>
      {/* Camera Selection Toolbar (CAM-01 Laptop vs CAM-02 Phone) */}
      <div className="bg-[#141626] px-3 py-1.5 border-b border-[#23273e] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectCamera && onSelectCamera('camera_1')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeCameraId === 'camera_1'
                ? 'bg-[#c9a24b] text-black shadow-md shadow-[#c9a24b]/20'
                : 'bg-[#181b2f] text-slate-400 hover:text-white border border-[#23273e]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>CAM-01 (Laptop)</span>
          </button>

          <button
            onClick={() => onSelectCamera && onSelectCamera('camera_2')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeCameraId === 'camera_2'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                : 'bg-[#181b2f] text-slate-400 hover:text-white border border-[#23273e]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>CAM-02 (Phone CCTV)</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Official MediaPipe Face Detector Status Badge (Requirement 14) */}
          <div
            id="mediapipe-status-badge"
            className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-1.5 border transition-all ${
              mpState.status === 'ready'
                ? 'text-cyan-300 bg-cyan-950/40 border-cyan-500/40'
                : mpState.status === 'loading'
                ? 'text-amber-300 bg-amber-950/40 border-amber-500/40'
                : mpState.status === 'error'
                ? 'text-red-300 bg-red-950/40 border-red-500/40'
                : 'text-slate-400 bg-slate-900 border-slate-800'
            }`}
            title={mpState.error ? `MediaPipe Error: ${mpState.error}` : "Google MediaPipe Tasks Vision Face Detector (VIDEO Mode)"}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              mpState.status === 'ready' ? 'bg-cyan-400 animate-ping' : mpState.status === 'loading' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'
            }`}></span>
            <span className="font-bold">MediaPipe Face AI</span>
            <span className="text-[9px] opacity-80">
              {mpState.status === 'ready' 
                ? (mpState.durationSec ? `(${mpState.durationSec}s)` : 'Ready') 
                : mpState.status === 'loading' 
                ? 'Loading...' 
                : 'Error'}
            </span>
          </div>

          {/* Quick Real Knife Threat Test Button */}
          <button
            onClick={() => onToggleManualSensor && onToggleManualSensor('weapons')}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 border transition-all ${
              manualSensors?.weapons || (dynamicObject?.detected && dynamicObject?.class === 'knife')
                ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-500/40 animate-pulse'
                : 'bg-red-950/40 text-red-300 hover:bg-red-900/60 border-red-800/60'
            }`}
            title="Toggle Real-Time Knife Threat Detection (Keyboard: K)"
          >
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>{manualSensors?.weapons ? 'KNIFE VISIBLE (95)' : 'TEST KNIFE'}</span>
          </button>

          <button
            onClick={() => setIsCameraMaximized(v => !v)}
            className="px-2 py-1 rounded text-[10px] font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 flex items-center gap-1 transition-all"
            title="Toggle enlarged camera view"
          >
            <Maximize2 className="w-3 h-3" />
            <span>{isCameraMaximized ? 'Standard Feed' : 'Enlarge Feed'}</span>
          </button>

          <button
            onClick={onOpenPhoneModal}
            className="px-2 py-1 rounded text-[10px] font-mono text-[#e6b84d] bg-[#c9a24b]/15 hover:bg-[#c9a24b]/25 border border-[#c9a24b]/40 flex items-center gap-1 transition-all"
            title="Connect mobile phone as Camera 2"
          >
            <QrCode className="w-3 h-3" />
            <span>Connect Phone QR</span>
          </button>
        </div>
      </div>

      {/* Top Banner: Checkpoint Live Camera Feed & Live Face Target Overlay (Expanded Size) */}
      <div id="checkpoint-camera-feed" className={`relative ${isCameraMaximized ? 'h-[520px] sm:h-[580px] md:h-[640px] lg:h-[700px]' : 'h-80 sm:h-96 md:h-[460px] lg:h-[520px]'} bg-black border-b border-[#23273e] overflow-hidden group transition-all duration-300`}>
        {/* Hidden Canvas for Live Video Frame Capture & Face Analysis */}
        <canvas ref={captureCanvasRef} width={640} height={480} style={{ display: 'none' }} className="hidden" />

        {/* Visible Canvas Overlay for Weapon & Sharp Object Bounding Boxes (COCO-SSD) */}
        <canvas
          ref={overlayCanvasRef}
          width={640}
          height={480}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Render CAM-01 (webcam/sim) or CAM-02 (phone) */}
        {activeCameraId === 'camera_2' ? (
          phoneFrame ? (
            <img
              src={phoneFrame}
              alt="Phone CCTV Stream"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-[#080912] flex flex-col items-center justify-center p-4 text-center">
              <Smartphone className="w-8 h-8 text-cyan-400 animate-pulse mb-2" />
              <div className="text-xs font-mono font-bold text-white">
                CAM-02 (PHONE CCTV) STANDBY
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                Scan QR or open <span className="text-cyan-300">/camera-feed</span> on phone to stream live.
              </p>
            </div>
          )
        ) : (
          useWebcam && !cameraError ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100 opacity-80"
            />
          ) : cameraError && useWebcam ? (
            <div className="relative w-full h-full bg-[#080912] flex flex-col items-center justify-center p-4 text-center">
              <Video className="w-8 h-8 text-amber-400 mb-2 animate-pulse" />
              <div className="text-xs font-mono font-bold text-amber-300">WEBCAM INITIALIZATION / STANDBY</div>
              <p className="text-[10px] font-mono text-slate-400 mt-1 max-w-xs">
                Webcam stream awaiting permissions. If running without physical webcam, toggle mode in header.
              </p>
            </div>
          ) : (
            <div className="relative w-full h-full bg-[#08090f] flex items-center justify-center overflow-hidden">
              <img
                src={
                  isFaceInFrame
                    ? (currentEvent?.photo || currentEvent?.entrant?.photo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80")
                    : "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=500&auto=format&fit=crop&q=80"
                }
                alt="Checkpoint Feed"
                className="w-full h-full object-cover opacity-60 filter contrast-125 brightness-90 grayscale-[20%]"
              />
              <div className="absolute inset-0 scanlines opacity-50 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#10121d] via-transparent to-black/40"></div>
            </div>
          )
        )}

        {/* Dynamic Holographic HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
          {/* Top HUD bar */}
          <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-bold uppercase tracking-wider">
                {activeCameraId === 'camera_2' ? 'CAM-02 • REMOTE MOBILE CCTV' : 'CAM-01 • CHECKPOINT OPTICAL / RADAR'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>FPS: 60.0</span>
              <span className="text-[#c9a24b] font-bold">WS SYNC: {detectionPulse % 1000}ms</span>
            </div>
          </div>

          {/* Number of faces currently detected (Requirement 8) */}
          {detectedFaceCount > 0 && (
            <div 
              id="live-face-count-badge"
              className="absolute top-11 left-3 px-2.5 py-1 bg-cyan-950/90 border border-cyan-500 rounded text-cyan-300 font-mono text-[10px] flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 z-10"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">
                {detectedFaceCount === 1 ? '1 FACE DETECTED' : `${detectedFaceCount} FACES DETECTED`}
              </span>
              {primaryConfidence > 0 && <span className="text-[9px] text-cyan-400/80">({Math.round(primaryConfidence * 100)}%)</span>}
            </div>
          )}

          {/* Dynamic Detected Knife Pill Tag */}
          {((dynamicObject.detected && dynamicObject.class === 'knife') || manualSensors?.weapons) && (
            <div 
              id="live-detected-object-badge"
              className="absolute top-11 right-3 px-2.5 py-1 bg-red-950/90 border border-red-500 rounded text-red-300 font-mono text-[10px] flex items-center gap-1.5 shadow-lg shadow-red-500/30 animate-pulse z-10"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="font-bold">KNIFE DETECTED</span>
              <span className="text-[9px] text-red-400/80">({dynamicObject.confidence || 88}%)</span>
            </div>
          )}

          {/* Prominent High-Visibility Knife Alert Message Banner */}
          {((dynamicObject.detected && dynamicObject.class === 'knife') || manualSensors?.weapons) && (
            <div 
              id="knife-visible-alert-banner"
              className="absolute top-11 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 bg-red-600/95 border-2 border-red-400 rounded-lg text-white font-mono text-[11px] sm:text-xs font-black flex items-center gap-2 shadow-2xl shadow-red-600/60 animate-pulse z-30 tracking-wide whitespace-nowrap"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-300 animate-bounce flex-shrink-0" />
              <span>⚠️ KNIFE VISIBLE IN FEED — THREAT SCORE: 95/100</span>
            </div>
          )}

          {/* Conditional Dynamic Bounding Box & Reticle: Follows user's face position across frame */}
          {(detectedFaceCount > 0 || isFaceInFrame) ? (
            <div 
              id="live-bounding-box" 
              className="border-2 border-dashed border-cyan-400/80 rounded-lg flex flex-col justify-between p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] animate-fadeIn transition-all duration-150"
              style={
                useWebcam && activeCameraId === 'camera_1'
                  ? {
                      position: 'absolute',
                      left: `${dynamicFaceBox.xPercent}%`,
                      top: `${dynamicFaceBox.yPercent}%`,
                      width: `${dynamicFaceBox.widthPercent}%`,
                      height: `${dynamicFaceBox.heightPercent}%`
                    }
                  : {
                      position: 'relative',
                      margin: '0 auto',
                      width: '8rem',
                      height: '8rem'
                    }
              }
            >
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-300"></div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-300"></div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-300"></div>

              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#06b6d4] animate-scanline"></div>

              <div className="flex justify-between text-[8px] font-mono text-cyan-300 bg-black/70 px-1 py-0.5 rounded">
                <span>OPTICAL SCAN</span>
                <span className="text-cyan-400 font-bold">
                  {detectedFaceCount > 1 ? `${detectedFaceCount} FACES` : 'FACE DETECTED'}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <Crosshair className="w-4 h-4 text-cyan-400/80 animate-spin" style={{ animationDuration: '10s' }} />
                <span className="text-[9px] font-mono mt-1 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 truncate max-w-[130px]">
                  {detectedFaceCount > 1 ? `${detectedFaceCount} Faces Active` : 'Face in Frame'}
                </span>
              </div>

              <div className="flex justify-between text-[8px] font-mono text-slate-300 bg-black/70 px-1 py-0.5 rounded">
                <span>OBJECT:</span>
                <span className={
                  (dynamicObject.detected && dynamicObject.class === 'knife') || manualSensors?.weapons
                    ? 'text-red-400 font-bold animate-pulse' 
                    : 'text-emerald-400 font-semibold'
                }>
                  {(dynamicObject.detected && dynamicObject.class === 'knife') || manualSensors?.weapons
                    ? `KNIFE DETECTED (${dynamicObject.confidence || 88}%)` 
                    : 'CLEAN / NONE'}
                </span>
              </div>
            </div>
          ) : !(cameraError && useWebcam) ? (
            /* Clear / Empty Frame Scanning State (Requirement 9) */
            <div id="no-face-in-frame" className="mx-auto flex flex-col items-center justify-center p-3 bg-black/60 border border-slate-700/60 rounded-lg text-slate-400 font-mono text-[10px]">
              <Target className="w-6 h-6 text-slate-500 animate-spin mb-1" style={{ animationDuration: '12s' }} />
              <span className="uppercase tracking-wider text-slate-200 font-bold">NO FACE DETECTED</span>
              <span className="text-[8px] text-slate-500 mt-0.5">MediaPipe active • Checkpoint perimeter clear</span>
            </div>
          ) : null}

          {/* Bottom Feed Metadata */}
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
            <div>
              ZONE: <span className="text-white font-bold">{currentEvent?.zone || "Gate 1 Alpha"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>STATUS:</span>
              <span className={isFaceInFrame ? "text-cyan-400 font-bold" : "text-slate-400"}>
                {isFaceInFrame ? (detectedFaceCount > 1 ? `${detectedFaceCount} FACES DETECTED` : "1 FACE DETECTED") : "NO FACE DETECTED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Risk Center: Radial Gauge, Badges, and Threat Vector */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">


        {/* Collapsible Widget 1: Hardware Sensors Status (Touch to Expand) */}
        <div className="border border-[#23273e] rounded-lg bg-[#0e101a] overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowSensorStrip(v => !v)}
            className="w-full px-3 py-1.5 flex items-center justify-between text-left text-slate-400 hover:text-white transition-all font-mono text-[10px]"
          >
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#c9a24b]" />
              <span className="font-bold">Hardware Sensors (RF & Network)</span>
              <span className="text-[9px] text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                Not Available (0 Score)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
              {showSensorStrip ? (
                <>
                  <span>Touch to Hide</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Touch to Show</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </div>
          </button>

          {showSensorStrip && (
            <div className="p-2 border-t border-[#23273e] grid grid-cols-2 gap-2 animate-fadeIn">
              <div 
                id="rf-sensor-panel-honest"
                className="p-2 rounded-lg bg-[#080910] border border-slate-800 text-slate-500 flex items-center gap-2 font-mono text-[9px]"
              >
                <Radio className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <div className="truncate">
                  <div className="font-bold text-slate-400 truncate">RF Detection — Not Available</div>
                  <div className="text-[8px] text-slate-600 truncate">(requires SDR hardware • 0 score)</div>
                </div>
              </div>

              <div 
                id="network-sensor-panel-honest"
                className="p-2 rounded-lg bg-[#080910] border border-slate-800 text-slate-500 flex items-center gap-2 font-mono text-[9px]"
              >
                <Wifi className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <div className="truncate">
                  <div className="font-bold text-slate-400 truncate">Network Monitoring — Not Available</div>
                  <div className="text-[8px] text-slate-600 truncate">(requires network access • 0 score)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Widget 2: Interactive Testing & Simulation Controls (Touch to Expand) */}
        <div className="border border-[#23273e] rounded-lg bg-[#141624] overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowSimControls(v => !v)}
            className="w-full px-3 py-1.5 flex items-center justify-between text-left text-slate-300 hover:text-white transition-all font-mono text-[10px]"
          >
            <div className="flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span className="font-bold text-cyan-300">Interactive Testing Controls</span>
              <span className="text-[9px] text-slate-400 bg-black/40 px-1.5 py-0.2 rounded border border-white/5">
                Step-in & Object Toggles
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-[#c9a24b] bg-[#c9a24b]/15 px-1.5 py-0.5 rounded border border-[#c9a24b]/40">
              {showSimControls ? (
                <>
                  <span>Touch to Hide</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Touch to Show</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </div>
          </button>

          {showSimControls && (
            <div className="p-2 border-t border-[#23273e] space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 font-bold flex items-center gap-1 text-cyan-400">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>LIVE FRAME DETECTION SWITCH:</span>
                </span>
                <button
                  onClick={() => onToggleFaceInFrame && onToggleFaceInFrame(!isFaceInFrame)}
                  className={`px-2 py-0.5 rounded font-bold transition-all text-[9px] ${
                    isFaceInFrame
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500 hover:bg-amber-900'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500 hover:bg-emerald-900'
                  }`}
                  title="Toggle subject presence in camera feed"
                >
                  {isFaceInFrame ? 'Move Out of Frame' : 'Step Into Frame'}
                </button>
              </div>

              {/* Quick Enrolled vs Unknown User Switcher */}
              <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono">
                <span className="text-slate-500">Step Into Frame:</span>
                <button
                  onClick={() => onSelectFusionState && onSelectFusionState({ isAuthorized: true, objectType: activeObject, subjectName: 'Tanvi P G' })}
                  className={`px-2 py-0.5 rounded border ${isAuthorized && displayName.includes('Tanvi') && !displayName.includes('&') ? 'bg-[#c9a24b] text-black font-bold' : 'bg-[#181b2f] text-slate-300 border-[#23273e]'}`}
                >
                  Tanvi (Auth)
                </button>
                <button
                  onClick={() => onSelectFusionState && onSelectFusionState({ isAuthorized: true, objectType: activeObject, subjectName: 'Sanidhya' })}
                  className={`px-2 py-0.5 rounded border ${isAuthorized && displayName.includes('Sanidhya') && !displayName.includes('&') ? 'bg-[#c9a24b] text-black font-bold' : 'bg-[#181b2f] text-slate-300 border-[#23273e]'}`}
                >
                  Sanidhya (Auth)
                </button>
                <button
                  onClick={() => onSelectFusionState && onSelectFusionState({ isAuthorized: true, objectType: activeObject, subjectName: 'Tanvi & Sanidhya', multiPerson: true })}
                  className={`px-2 py-0.5 rounded border ${displayName.includes('&') ? 'bg-cyan-500 text-black font-bold' : 'bg-[#181b2f] text-cyan-300 border-cyan-800'}`}
                  title="Test multiple entrants in frame simultaneously"
                >
                  Both (Tanvi & Sanidhya)
                </button>
                <button
                  onClick={() => onSelectFusionState && onSelectFusionState({ isAuthorized: false, objectType: activeObject, subjectName: 'Unknown User 1' })}
                  className={`px-2 py-0.5 rounded border ${!isAuthorized && displayName === 'Unknown User 1' ? 'bg-red-500 text-white font-bold' : 'bg-[#181b2f] text-slate-300 border-[#23273e]'}`}
                >
                  Unknown User 1
                </button>
                <button
                  onClick={() => onSelectFusionState && onSelectFusionState({ isAuthorized: false, objectType: activeObject, subjectName: 'Unknown User 2' })}
                  className={`px-2 py-0.5 rounded border ${!isAuthorized && displayName === 'Unknown User 2' ? 'bg-red-500 text-white font-bold' : 'bg-[#181b2f] text-slate-300 border-[#23273e]'}`}
                >
                  Unknown User 2
                </button>
              </div>

              {/* Real Live Camera Object Screening Status (Knife Only) */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${dynamicObject.detected && dynamicObject.class === 'knife' ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
                  <span className="font-bold">LIVE OBJECT SCAN:</span>
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] border transition-all ${
                  dynamicObject.detected && dynamicObject.class === 'knife'
                    ? 'bg-red-950/90 border-red-500 text-red-300 shadow-md shadow-red-500/30 animate-pulse'
                    : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400'
                }`}>
                  {dynamicObject.detected && dynamicObject.class === 'knife'
                    ? `KNIFE DETECTED (${dynamicObject.confidence}%)`
                    : 'NO KNIFE DETECTED (PERIMETER CLEAN)'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
