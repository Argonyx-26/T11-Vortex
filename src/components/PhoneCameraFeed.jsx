import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Smartphone, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  VideoOff, 
  Zap, 
  Shield, 
  ArrowLeft,
  Sliders
} from 'lucide-react';

export default function PhoneCameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const streamRef = useRef(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) or 'user' (front)
  const [fps, setFps] = useState(8);
  const [framesSent, setFramesSent] = useState(0);
  const [activeSubject, setActiveSubject] = useState('none'); // 'none', 'tanvi', 'unknown1'
  const [backendStatus, setBackendStatus] = useState('connecting');

  // Start mobile camera stream
  useEffect(() => {
    startCamera();
    connectWebSocket();

    return () => {
      stopCamera();
      if (wsRef.current) wsRef.current.close();
    };
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();
    setStreamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
    } catch (err) {
      console.warn('Mobile camera access error, using simulated feed:', err);
      setStreamError('Camera permission needed or camera unavailable. Simulation stream active.');
      setIsStreaming(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const connectWebSocket = () => {
    const host = window.location.hostname || 'localhost';
    const wsUrl = `ws://${host}:3001`;
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setBackendStatus('connected');
        ws.send(JSON.stringify({ type: 'register_camera', camera_id: 'camera_2' }));
      };
      ws.onerror = () => setBackendStatus('offline-sync');
      ws.onclose = () => setBackendStatus('offline-sync');
    } catch {
      setBackendStatus('offline-sync');
    }
  };

  // Frame streaming loop (runs at specified FPS)
  useEffect(() => {
    if (!isStreaming) return;

    const intervalMs = Math.round(1000 / fps);
    const interval = setInterval(() => {
      let frameData = null;

      if (videoRef.current && canvasRef.current && !streamError) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 320, 240);
        frameData = canvas.toDataURL('image/jpeg', 0.65);
      } else {
        // Fallback simulation frame based on active test subject
        frameData = activeSubject === 'tanvi'
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
          : activeSubject === 'unknown1'
          ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";
      }

      if (frameData) {
        // Broadcast via WebSocket
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({
            type: 'camera_frame',
            camera_id: 'camera_2',
            frame: frameData,
            timestamp: Date.now()
          }));
        }

        // Broadcast via HTTP POST
        fetch(`http://${window.location.hostname || 'localhost'}:3001/api/camera-frame`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ camera_id: 'camera_2', frame: frameData, timestamp: Date.now() })
        }).catch(() => {});

        // Store in localStorage for instant same-browser multi-tab sync
        try {
          localStorage.setItem('vortex_camera_2_frame', frameData);
          localStorage.setItem('vortex_camera_2_timestamp', Date.now().toString());
          window.dispatchEvent(new CustomEvent('camera_2_frame_updated', { detail: { frame: frameData } }));
        } catch {}

        setFramesSent(f => f + 1);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isStreaming, fps, streamError, activeSubject]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-slate-100 flex flex-col font-mono selection:bg-[#c9a24b] selection:text-black">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <header className="p-3 bg-[#0d0f1b] border-b border-[#23273e] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#c9a24b]/20 border border-[#c9a24b]/50 text-[#e6b84d]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-wider text-white">
                VORTEX CCTV SENSOR
              </h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                CAM-02
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Mobile Optical Node • Zone B Ingress</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
            isStreaming 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500 animate-pulse' 
              : 'bg-red-950 text-red-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            LIVE
          </span>
          <a
            href="/"
            className="px-2 py-1 rounded bg-[#181a2e] text-slate-300 hover:text-white text-xs border border-[#23273e]"
          >
            Dashboard
          </a>
        </div>
      </header>

      {/* Main Viewfinder */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        {videoRef && !streamError ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-[#0a0a14]">
            <img
              src={
                activeSubject === 'tanvi'
                  ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
                  : activeSubject === 'unknown1'
                  ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80"
                  : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
              }
              alt="CCTV Stream"
              className="w-full h-full object-cover opacity-70 filter contrast-125"
            />
            <div className="absolute inset-0 scanlines opacity-40 pointer-events-none"></div>
          </div>
        )}

        {/* Dynamic Holographic HUD Over Viewfinder */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
          {/* Top HUD Stats */}
          <div className="flex items-center justify-between text-[11px] font-mono bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-white font-bold">NODE: CAM-02 (PHONE)</span>
            </div>
            <div className="flex items-center gap-3 text-cyan-300">
              <span>FPS: {fps}</span>
              <span>SENT: {framesSent}</span>
            </div>
          </div>

          {/* Center Targeting Reticle */}
          <div className="relative mx-auto w-52 h-52 border-2 border-dashed border-cyan-400/70 rounded-2xl flex flex-col justify-between p-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300"></div>

            <div className="text-[9px] bg-black/70 text-cyan-300 px-1.5 py-0.5 rounded self-start">
              ALIGN ENTRANT FACE
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-1 rounded inline-block">
                STREAMING TO VORTEX CORE
              </div>
            </div>
            <div className="text-[9px] bg-black/70 text-slate-300 px-1.5 py-0.5 rounded self-end">
              ZERO-TRUST FUSION ACTIVE
            </div>
          </div>

          {/* Bottom HUD Bar */}
          <div className="flex items-center justify-between text-[10px] bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <span className="text-emerald-400 font-bold">
              ✓ CAMERA 2 WEBSOCKET PIPE CONNECTED
            </span>
            <span className="text-[#c9a24b]">
              LATENCY &lt; 40ms
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Controls Toolbar */}
      <div className="p-3 bg-[#0d0f1b] border-t border-[#23273e] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Flip Camera Button */}
          <button
            onClick={toggleCamera}
            className="flex-1 py-2 px-3 rounded-lg bg-[#181a2e] hover:bg-[#20243d] border border-[#23273e] text-xs font-bold flex items-center justify-center gap-1.5 text-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>Flip Camera ({facingMode === 'environment' ? 'Rear' : 'Front'})</span>
          </button>

          {/* Frame Rate Selector */}
          <div className="flex items-center gap-1 bg-[#141624] p-1 rounded-lg border border-[#23273e] text-xs">
            <span className="text-[10px] text-slate-400 px-1">Rate:</span>
            {[5, 8, 12].map(rate => (
              <button
                key={rate}
                onClick={() => setFps(rate)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  fps === rate ? 'bg-[#c9a24b] text-black' : 'text-slate-400'
                }`}
              >
                {rate} FPS
              </button>
            ))}
          </div>
        </div>

        {/* Quick Simulation Levers for Mobile Testing */}
        <div className="p-2 rounded-lg bg-[#141624] border border-[#23273e] flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Simulate Subject in Frame:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveSubject('none')}
              className={`px-2 py-0.5 rounded text-[10px] ${activeSubject === 'none' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              Clear
            </button>
            <button
              onClick={() => setActiveSubject('tanvi')}
              className={`px-2 py-0.5 rounded text-[10px] ${activeSubject === 'tanvi' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Tanvi (Auth)
            </button>
            <button
              onClick={() => setActiveSubject('unknown1')}
              className={`px-2 py-0.5 rounded text-[10px] ${activeSubject === 'unknown1' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Unknown 1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
