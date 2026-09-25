import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Radio, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  UserCheck, 
  Video, 
  Camera, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Cpu,
  UserPlus
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Header({
  facilityStatus,
  falseAlarmsPrevented,
  isDemoRunning,
  onRunDemo,
  onResetDemo,
  onTriggerInsiderThreat,
  showArchitecture,
  setShowArchitecture,
  useWebcam,
  setUseWebcam,
  activeStage,
  onOpenRegister
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const getStatusBadge = () => {
    switch (facilityStatus) {
      case 'CRITICAL':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/80 text-red-400 font-mono text-xs font-bold animate-pulse shadow-lg shadow-red-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>CRITICAL • LOCKDOWN</span>
          </div>
        );
      case 'SUSPICIOUS':
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/70 text-amber-400 font-mono text-xs font-bold shadow-lg shadow-amber-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>SUSPICIOUS • ELEVATED</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/60 text-emerald-400 font-mono text-xs font-semibold shadow-md shadow-emerald-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>NORMAL • ALL CLEAR</span>
          </div>
        );
    }
  };

  return (
    <header className="relative z-20 border-b border-[#23273e] bg-[#0c0d16]/95 backdrop-blur-md px-4 lg:px-6 py-3">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Brand & Mission */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#c9a24b]/20 to-black border border-[#c9a24b]/50 text-[#c9a24b] shadow-md shadow-[#c9a24b]/15">
              <Shield className="w-6 h-6 text-[#c9a24b]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-[#0a0a0f] animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-black tracking-wider text-white font-sans">
                  VORTEX
                </h1>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#c9a24b]/15 text-[#e6b84d] border border-[#c9a24b]/30">
                  Zero Trust Line
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                  ARGONYX'26
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="text-cyan-400">RV University</span> • Multi-Sensor Fusion Core
              </p>
            </div>
          </div>

          <div className="block md:hidden">
            {getStatusBadge()}
          </div>
        </div>

        {/* Center: Live Clock, Status Pill, False Alarms Counter */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-5 w-full md:w-auto">
          {/* Status Badge */}
          <div className="hidden md:block">
            {getStatusBadge()}
          </div>

          {/* False Alarms Prevented Counter */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#141726] border border-[#23273e] shadow-inner">
            <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400">
                False Alarms Prevented
              </div>
              <div className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1">
                <span>{falseAlarmsPrevented}</span>
                <span className="text-[10px] text-slate-400 font-normal">cleared silently (baseline)</span>
              </div>
            </div>
          </div>

          {/* Live UTC/Local Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141726] border border-[#23273e] text-right font-mono">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
            <div>
              <div className="text-xs font-bold text-slate-200 tracking-wider">
                {currentTime || '00:00:00'}
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-widest">
                {currentDate}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Demo Actions & Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Architecture Toggle */}
          <button
            onClick={() => setShowArchitecture(!showArchitecture)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all border ${
              showArchitecture 
                ? 'bg-[#c9a24b]/20 text-[#e6b84d] border-[#c9a24b]/60' 
                : 'bg-[#141726] text-slate-300 border-[#23273e] hover:border-slate-600'
            }`}
            title="Toggle Architecture Diagram"
          >
            <Cpu className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span className="hidden sm:inline">Pipeline</span>
          </button>

          {/* Mode Toggle Badge (LIVE CAMERA vs CCTV SIM) */}
          <button
            id="camera-mode-toggle"
            onClick={() => setUseWebcam(!useWebcam)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all border ${
              useWebcam 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/80 shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/40' 
                : 'bg-amber-950/60 text-amber-300 border-amber-500/60 hover:border-amber-400'
            }`}
            title="Switch between Live Real Webcam and Simulated CCTV Feed"
          >
            {useWebcam ? (
              <>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>MODE: LIVE CAMERA</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>MODE: CCTV SIM (Simulated)</span>
              </>
            )}
          </button>

          {/* Register Face Button */}
          <button
            onClick={onOpenRegister}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#c9a24b]/20 hover:bg-[#c9a24b]/30 text-[#e6b84d] border border-[#c9a24b]/60 flex items-center gap-1.5 transition-all hover:shadow-md hover:shadow-[#c9a24b]/20 active:scale-95"
            title="Enroll New Face into Persistent Store"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#e6b84d]" />
            <span>Register</span>
          </button>

          {/* Insider Threat Demo Button */}
          <button
            onClick={onTriggerInsiderThreat}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-purple-900/60 to-purple-800/40 text-purple-200 border border-purple-500/50 hover:border-purple-400 transition-all flex items-center gap-1.5 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
            title="Demonstrate: Verified Face + Dangerous Object Escalation (Demo Scenario)"
          >
            <UserCheck className="w-3.5 h-3.5 text-purple-300" />
            <span>"Insider Threat" (Demo)</span>
          </button>

          {/* Run Demo Scenario Button */}
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              isDemoRunning 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait' 
                : 'bg-gradient-to-r from-[#c9a24b] to-[#a88235] text-black font-extrabold hover:brightness-110 shadow-[#c9a24b]/20 hover:shadow-[#c9a24b]/40'
            }`}
            title="Trigger automated 3-stage hackathon demo (Keyboard: Spacebar)"
          >
            <Play className={`w-3.5 h-3.5 ${isDemoRunning ? 'animate-spin' : 'fill-current'}`} />
            <span>{isDemoRunning ? 'Running Demo...' : 'DEMO MODE (Scripted Walkthrough)'}</span>
            <span className="hidden xl:inline text-[9px] px-1 py-0.5 rounded bg-black/30 text-black/80 font-normal">
              Space
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleMuteToggle}
            className={`p-1.5 rounded-lg border transition-all ${
              isMuted 
                ? 'bg-red-950/40 border-red-800/40 text-red-400' 
                : 'bg-[#141726] border-[#23273e] text-slate-400 hover:text-slate-200'
            }`}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}
