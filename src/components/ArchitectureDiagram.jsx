import React from 'react';
import { Camera, Radio, Cpu, Network, ArrowRight, ShieldCheck, AlertCircle, Siren, Zap, RadioTower } from 'lucide-react';

export default function ArchitectureDiagram({ activeStage, isOpen, onClose }) {
  if (!isOpen) return null;

  const stages = [
    {
      id: 'ingestion',
      step: '01',
      title: 'Sensor Ingestion',
      subtitle: 'Multi-spectral edge capture',
      icon: Camera,
      detail: 'Live Webcam/Phone CCTV + Object Neural Vision (RF/Network: N/A)',
      color: 'border-blue-500 text-blue-400 bg-blue-950/30'
    },
    {
      id: 'fusion',
      step: '02',
      title: 'Fusion Engine',
      subtitle: 'Zero Trust cross-verification',
      icon: RadioTower,
      detail: 'Cross-checks live face recognition against real-time object danger weights',
      color: 'border-[#c9a24b] text-[#e6b84d] bg-[#c9a24b]/10'
    },
    {
      id: 'correlation',
      step: '03',
      title: 'AI Threat Correlation',
      subtitle: 'Explainable risk synthesis',
      icon: Cpu,
      detail: 'Dynamic risk scoring (0-100) & contextual anomaly weighting',
      color: 'border-purple-500 text-purple-300 bg-purple-950/30'
    },
    {
      id: 'dispatch',
      step: '04',
      title: 'Tiered Dispatch',
      subtitle: 'Automated response routing',
      icon: Siren,
      detail: 'NORMAL: Silent Log • SUSPICIOUS: Guard Alert • CRITICAL: Emergency Dispatch (Simulated/Twilio)',
      color: 'border-red-500 text-red-400 bg-red-950/30'
    }
  ];

  return (
    <div className="border-b border-[#23273e] bg-[#0d0f1b]/95 px-4 py-3 text-xs transition-all animate-fadeIn">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a24b]"></span>
            <span className="font-mono font-bold tracking-wider text-slate-300 uppercase text-[11px]">
              Vortex Real-Time Pipeline Architecture
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              (Active Execution Tracking)
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[10px] font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/60"
          >
            Collapse [▲]
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            return (
              <div 
                key={stage.id}
                className={`relative p-3 rounded-lg border transition-all duration-300 ${
                  isActive 
                    ? `${stage.color} ring-2 ring-white/50 scale-[1.02] shadow-lg shadow-[#c9a24b]/20` 
                    : 'border-[#23273e] bg-[#121422] text-slate-400 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-white text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                </div>
                <div className="font-sans font-bold text-white text-xs mb-0.5 flex items-center gap-1.5">
                  <span>{stage.title}</span>
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  )}
                </div>
                <div className="text-[10px] text-slate-300 font-medium mb-1">
                  {stage.subtitle}
                </div>
                <div className="text-[9px] font-mono text-slate-400 leading-tight">
                  {stage.detail}
                </div>

                {/* Arrow connector */}
                {idx < stages.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#181a2e] border border-[#23273e] items-center justify-center text-slate-400">
                    <ArrowRight className="w-3 h-3 text-[#c9a24b]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
