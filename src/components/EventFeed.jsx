import React from 'react';
import { 
  Crosshair, 
  Radio, 
  Activity, 
  Wifi, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  AlertTriangle, 
  User, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function EventFeed({ events, selectedEventId, onSelectEvent }) {
  const getSensorColorClass = (state) => {
    switch (state) {
      case 'red':
        return 'text-red-400 bg-red-950/70 border-red-500/70 shadow-sm shadow-red-500/30';
      case 'amber':
        return 'text-amber-400 bg-amber-950/70 border-amber-500/70 shadow-sm shadow-amber-500/30';
      case 'disabled':
        return 'text-slate-500 bg-slate-900/60 border-slate-800 opacity-60';
      default:
        return 'text-emerald-400 bg-emerald-950/50 border-emerald-500/50';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CRITICAL':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 border border-red-500/80 text-red-400 animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            CRITICAL
          </span>
        );
      case 'SUSPICIOUS':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/80 text-amber-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            SUSPICIOUS
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/60 text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            NORMAL
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#10121d] border border-[#23273e] rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-3 border-b border-[#23273e] bg-[#141726] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Live Checkpoint Ingress Feed
            </h2>
            <span className="text-[9px] font-mono text-slate-400">
              Biometric + Object Verification Log
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
            {events.length} logs
          </span>
          <span className="text-[9px] font-mono text-[#c9a24b] bg-[#c9a24b]/10 border border-[#c9a24b]/30 px-1.5 py-0.5 rounded">
            Auto-stream 4s
          </span>
        </div>
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {events.map((evt) => {
          const isSelected = selectedEventId === evt.id;
          const sensors = evt.sensors || {
            weapons: { state: 'green', label: 'Clear' },
            rf: { state: 'disabled', label: 'Not Available' },
            motion: { state: 'disabled', label: 'Not Available' },
            network: { state: 'disabled', label: 'Not Available' }
          };

          return (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className={`group cursor-pointer p-3 rounded-lg border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-[#181b2f] border-[#c9a24b] ring-1 ring-[#c9a24b]/40 shadow-lg shadow-[#c9a24b]/10'
                  : 'bg-[#131524] border-[#23273e] hover:border-slate-600 hover:bg-[#16182a]'
              }`}
            >
              {/* Left active indicator bar */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a24b]"></div>
              )}

              {/* Top row: Name, Time, and Status */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-bold text-sm text-slate-100 group-hover:text-white">
                      {evt.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {evt.empId}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {evt.zone}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono text-slate-400">
                    {evt.timestamp}
                  </span>
                  {getStatusBadge(evt.status)}
                </div>
              </div>

              {/* Middle row: Face match and Risk Score */}
              <div className="flex items-center justify-between text-xs py-1 px-2 rounded bg-black/30 border border-white/5 mb-2">
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  {evt.faceMatch ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Face Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-red-400 font-medium">Face Mismatch</span>
                    </>
                  )}
                  <span className="text-slate-400 text-[10px]">
                    ({evt.faceConfidence || 98.2}%)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-slate-400 text-[10px]">Risk:</span>
                  <span className={`font-bold ${
                    evt.riskScore >= 65 ? 'text-red-400' :
                    evt.riskScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {evt.riskScore}/100
                  </span>
                </div>
              </div>

              {/* Bottom row: Honest Sensor Badges */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {/* 1. Weapons */}
                <div 
                  className={`flex flex-col items-center justify-center p-1 rounded border text-[9px] font-mono ${getSensorColorClass(sensors.weapons?.state)}`}
                  title={`Weapons Sensor: ${sensors.weapons?.detail || sensors.weapons?.label}`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Crosshair className="w-2.5 h-2.5" />
                    <span className="font-semibold">WEAPON</span>
                  </div>
                  <span className="text-[8px] opacity-90 truncate max-w-full">
                    {sensors.weapons?.label || 'Clear'}
                  </span>
                </div>

                {/* 2. RF Waves (Honest Not Available) */}
                <div 
                  className={`flex flex-col items-center justify-center p-1 rounded border text-[9px] font-mono ${getSensorColorClass('disabled')}`}
                  title="RF Detection — Not Available (requires SDR hardware)"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Radio className="w-2.5 h-2.5" />
                    <span className="font-semibold">RF WAVE</span>
                  </div>
                  <span className="text-[8px] opacity-75 truncate max-w-full">
                    N/A (No SDR)
                  </span>
                </div>

                {/* 3. Motion (Honest Not Available) */}
                <div 
                  className={`flex flex-col items-center justify-center p-1 rounded border text-[9px] font-mono ${getSensorColorClass('disabled')}`}
                  title="Motion Sensor — Not Available"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Activity className="w-2.5 h-2.5" />
                    <span className="font-semibold">MOTION</span>
                  </div>
                  <span className="text-[8px] opacity-75 truncate max-w-full">
                    N/A (Passive)
                  </span>
                </div>

                {/* 4. Network (Honest Not Available) */}
                <div 
                  className={`flex flex-col items-center justify-center p-1 rounded border text-[9px] font-mono ${getSensorColorClass('disabled')}`}
                  title="Network Monitoring — Not Available (requires network access integration)"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Wifi className="w-2.5 h-2.5" />
                    <span className="font-semibold">NETWORK</span>
                  </div>
                  <span className="text-[8px] opacity-75 truncate max-w-full">
                    N/A (No Tap)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
