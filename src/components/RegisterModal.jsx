import React, { useState, useRef, useEffect } from 'react';
import { 
  UserPlus, 
  Camera, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Crosshair, 
  AlertCircle, 
  Check, 
  Users,
  Video,
  VideoOff
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { registerPersonnelOnlineOrOffline, getAuthorizedPersonnel } from '../utils/personnelStore';

export default function RegisterModal({ isOpen, onClose, onPersonnelRegistered }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('SecOps Engineering');
  const [useCamera, setUseCamera] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [captureStep, setCaptureStep] = useState(0); // 0: idle, 1: frame 1, 2: frame 2, 3: frame 3, 4: complete
  const [capturedFrames, setCapturedFrames] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [registeredPerson, setRegisteredPerson] = useState(null);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera stream when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      resetForm();
      return;
    }

    if (useCamera) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, useCamera]);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      console.warn('Webcam not accessible, using biometric simulation stream');
      setUseCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const resetForm = () => {
    setName('');
    setRole('');
    setCapturedFrames([]);
    setCapturing(false);
    setCaptureStep(0);
    setSuccessMessage(null);
    setRegisteredPerson(null);
    setError(null);
  };

  // Capture 1-3 frames of the face
  const captureFrameFromVideo = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 320, 240);
      return canvas.toDataURL('image/jpeg', 0.85);
    }
    // Fallback high-res biometric profile placeholder
    const sampleAvatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
    ];
    return sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!name || name.trim() === '') {
      setError('Please provide a name for face enrollment.');
      return;
    }

    setError(null);
    setCapturing(true);
    soundFx.playScan();

    const frames = [];

    // Frame 1
    setCaptureStep(1);
    await new Promise(r => setTimeout(r, 400));
    frames.push(captureFrameFromVideo());
    soundFx.playTone(800, 'sine', 0.05, 0.06);

    // Frame 2
    setCaptureStep(2);
    await new Promise(r => setTimeout(r, 450));
    frames.push(captureFrameFromVideo());
    soundFx.playTone(950, 'sine', 0.05, 0.06);

    // Frame 3
    setCaptureStep(3);
    await new Promise(r => setTimeout(r, 450));
    frames.push(captureFrameFromVideo());
    soundFx.playTone(1100, 'sine', 0.08, 0.07);

    setCapturedFrames(frames);

    // Generate biometric encoding & persist to store
    try {
      const result = await registerPersonnelOnlineOrOffline({
        name: name.trim(),
        role: role.trim() || 'Authorized Personnel',
        department: department.trim(),
        frames
      });

      setCaptureStep(4);
      setCapturing(false);
      soundFx.playNormal();
      setSuccessMessage(`${result.personnel.name} registered as authorized`);
      setRegisteredPerson(result.personnel);

      // Notify parent to immediately recognize this face in the live loop
      if (onPersonnelRegistered) {
        onPersonnelRegistered(result.personnel);
      }
    } catch (err) {
      setCapturing(false);
      setError('Failed to persist enrollment: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Hidden canvas for video frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative w-full max-w-2xl bg-[#0f111d] border-2 border-[#c9a24b] rounded-2xl shadow-[0_0_50px_rgba(201,162,75,0.3)] overflow-hidden font-mono text-slate-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#1f1a10] via-[#2a2313] to-[#1a1710] p-4 border-b border-[#c9a24b]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black/50 border border-[#c9a24b]/50 text-[#e6b84d]">
              <UserPlus className="w-5 h-5 text-[#e6b84d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#c9a24b]/20 text-[#e6b84d] border border-[#c9a24b]/30">
                  PERSISTENT BIOMETRIC STORE
                </span>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
                  Zero Trust Enrollment
                </span>
              </div>
              <h2 className="text-base font-black tracking-wider uppercase text-white mt-0.5">
                Authorized Personnel Face Registration
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-all"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation Banner */}
        {successMessage && registeredPerson && (
          <div id="enrollment-success-banner" className="p-4 bg-emerald-950/80 border-b border-emerald-500/60 animate-fadeIn">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                    {successMessage}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    Biometric 128-D vector persisted. Immediately recognized as <span className="text-emerald-400 font-bold">AUTHORIZED (+0 modifier)</span> by live detection loop.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetForm();
                  }}
                  className="px-2.5 py-1 rounded text-xs bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40"
                >
                  Enroll Another
                </button>
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black font-sans"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-950/80 border-b border-red-500/60 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Enrollment Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Form Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    FULL NAME <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanidhya / Marcus Thorne"
                    disabled={capturing}
                    className="w-full px-3 py-2 rounded-lg bg-[#141624] border border-[#23273e] text-white text-xs font-mono focus:outline-none focus:border-[#c9a24b] focus:ring-1 focus:ring-[#c9a24b]"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Unregistered entrants are automatically treated as UNAUTHORIZED (+15).
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    ASSIGNED ROLE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Sensor Fusion Engineer / SecOps"
                    disabled={capturing}
                    className="w-full px-3 py-2 rounded-lg bg-[#141624] border border-[#23273e] text-white text-xs font-mono focus:outline-none focus:border-[#c9a24b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1">
                    DEPARTMENT / FACILITY WING
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={capturing}
                    className="w-full px-3 py-2 rounded-lg bg-[#141624] border border-[#23273e] text-slate-200 text-xs font-mono focus:outline-none focus:border-[#c9a24b]"
                  >
                    <option value="Hardware Telemetry">Hardware Telemetry (RVU Wing)</option>
                    <option value="R&D Biometrics">R&D Biometrics</option>
                    <option value="SecOps Intelligence">SecOps Intelligence</option>
                    <option value="Emergency Dispatch">Emergency Dispatch</option>
                    <option value="Visitor Escort">Authorized Contractor</option>
                  </select>
                </div>

                {/* Live Fusion Rule Indicator */}
                <div className="p-3 rounded-lg bg-[#141624] border border-[#23273e] text-[11px] text-slate-300 space-y-1">
                  <div className="text-[#c9a24b] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Fusion Rule: Identity Modifier</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-[10px]">
                    Once enrolled, this face applies a <span className="text-emerald-400 font-bold">+0 risk modifier</span>. Any entrant not in this store receives a <span className="text-amber-400 font-bold">+15 unauthorized penalty</span>.
                  </p>
                </div>
              </div>

              {/* Right Column: Live Video & Multi-Frame Capture HUD */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-400">
                  <span className="font-bold flex items-center gap-1.5 text-cyan-400">
                    <Camera className="w-3.5 h-3.5" />
                    <span>LIVE BIOMETRIC CAPTURE (1-3 FRAMES)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setUseCamera(!useCamera)}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    {useCamera ? 'Use Simulated Feed' : 'Use Webcam'}
                  </button>
                </div>

                <div className="relative h-48 bg-black rounded-lg overflow-hidden border border-[#23273e] flex items-center justify-center">
                  {useCamera ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100 opacity-85"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-[#080912]">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                        alt="Simulated Face"
                        className="w-full h-full object-cover opacity-60 filter contrast-125"
                      />
                      <div className="absolute inset-0 scanlines opacity-50 pointer-events-none"></div>
                    </div>
                  )}

                  {/* Holographic Face Bounding Reticle */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-3">
                    <div className="relative w-28 h-28 border-2 border-dashed border-cyan-400/80 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      <Crosshair className="w-5 h-5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute -bottom-5 text-[9px] font-mono bg-black/80 px-2 py-0.5 rounded text-cyan-300">
                        {capturing ? `FRAME ${captureStep}/3` : 'ALIGN FACE'}
                      </div>
                    </div>
                  </div>

                  {/* Multi-frame progress flash overlay */}
                  {capturing && (
                    <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex flex-col items-center justify-center text-white font-mono text-xs font-bold animate-pulse">
                      <RefreshCw className="w-6 h-6 animate-spin text-cyan-300 mb-1" />
                      <span>CAPTURING FRAME {captureStep} OF 3...</span>
                      <span className="text-[10px] text-cyan-200 font-normal">Extracting Facial Landmark Coordinates</span>
                    </div>
                  )}
                </div>

                {/* Frame Previews Strip */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="h-12 rounded border border-[#23273e] bg-[#121422] flex items-center justify-center text-[9px] font-mono text-slate-500 overflow-hidden relative"
                    >
                      {capturedFrames[idx] ? (
                        <>
                          <img src={capturedFrames[idx]} alt={`Frame ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 right-0 bg-emerald-500 text-black px-1 font-bold text-[8px]">
                            ✓ F{idx + 1}
                          </div>
                        </>
                      ) : (
                        <span>Frame {idx + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Submit Bar */}
            <div className="pt-3 border-t border-[#23273e] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Persistence: Saved to persistent JSON store & live memory.
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#141624] border border-[#23273e] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={capturing || !name || name.trim() === ''}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg ${
                    capturing || !name || name.trim() === ''
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#c9a24b] to-[#a88235] text-black font-extrabold hover:brightness-110 shadow-[#c9a24b]/20 active:scale-95'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{capturing ? 'Enrolling Face...' : 'Capture & Register Face'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
