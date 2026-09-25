import React, { useState, useEffect } from 'react';
import { 
  Siren, 
  AlertTriangle, 
  X, 
  Send, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Key, 
  Radio
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function EmergencyModal({ isOpen, onClose, currentEvent, riskScore }) {
  const [etaSeconds, setEtaSeconds] = useState(192); // 3m 12s
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatEta = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Red Critical Pulse Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-red-600/10 animate-pulse-critical"></div>

      <div className="relative w-full max-w-2xl bg-[#0f111d] border-2 border-red-500 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.5)] overflow-hidden font-mono">
        {/* Header Alert Strip */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black/30 border border-white/20 animate-bounce">
              <Siren className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase bg-black/40 px-2 py-0.5 rounded font-black tracking-widest">
                  PRIORITY 1 DISPATCH
                </span>
                <span className="text-xs bg-white text-red-700 px-2 py-0.5 rounded font-bold animate-pulse">
                  CRITICAL LOCKDOWN
                </span>
                <span className="text-[10px] uppercase bg-black/50 text-white/90 px-2 py-0.5 rounded border border-white/20">
                  Simulated for demo
                </span>
              </div>
              <h2 className="text-lg font-black tracking-wider uppercase mt-0.5">
                Automated Emergency Response Engaged
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all"
            title="Dismiss Alert"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Top incident summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs">
            <div>
              <div className="text-slate-400 text-[10px]">INCIDENT LOCATION</div>
              <div className="font-bold text-white flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {currentEvent?.zone || "Gate 1 Alpha"}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">THREAT SEVERITY</div>
              <div className="font-bold text-red-400 text-sm mt-0.5">
                RISK {riskScore || 95}/100 • HIGH
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">TACTICAL ETA</div>
              <div className="font-bold text-amber-300 font-mono text-sm mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatEta(etaSeconds)}
              </div>
            </div>
          </div>

          {/* Simulated SMS Dispatch to Onsite Security */}
          <div className="p-3.5 rounded-xl bg-[#141727] border border-[#23273e]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Simulated SMS Dispatch (Guard Unit 4)</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> SENT • DELIVERED
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0c0d16] border border-slate-800 text-xs leading-relaxed text-slate-300">
              <div className="text-[10px] text-slate-500 mb-1">
                TO: Onsite Tactical Response Lead (+1-555-019-9238) • Channel Alpha
              </div>
              <p className="text-amber-300 font-mono text-[11px]">
                "[VORTEX-CRITICAL] Threat detected at {currentEvent?.zone || "Gate 1"}. Subject: {currentEvent?.name || "Subject Unknown"} ({currentEvent?.empId || "UNK-0099"}). Multi-sensor correlation triggered weapons radar alert. Turnstiles locked. Intercept team dispatched."
              </p>
            </div>
          </div>

          {/* Simulated API Webhook Dispatch to Police / EMS */}
          <div className="p-3.5 rounded-xl bg-[#141727] border border-[#23273e]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Simulated 911 / EMS CAD Dispatch Webhook</span>
              </div>
              <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/50">
                HTTP 201 CREATED
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0c0d16] border border-slate-800 text-[10px] font-mono text-cyan-300 overflow-x-auto">
              <div>POST /api/v1/cad/emergency_dispatch HTTP/1.1</div>
              <div>Host: dispatch.metro911.internal</div>
              <div className="text-slate-500 mt-1">{"{"}</div>
              <div className="pl-4 text-slate-300">"facility": "RV University - Argon High Security Wing",</div>
              <div className="pl-4 text-slate-300">"checkpoint": "{currentEvent?.zone || "Gate 1 Alpha"}",</div>
              <div className="pl-4 text-slate-300">"risk_index": {riskScore || 95},</div>
              <div className="pl-4 text-slate-300">"escalation_reason": "Concealed weapon + biometric mismatch",</div>
              <div className="pl-4 text-slate-300">"assigned_units": ["SWAT_METRO_04", "PARAMEDIC_UNIT_12"],</div>
              <div className="pl-4 text-slate-300">"lockdown_barrier": "TURNSTILES_ENGAGED"</div>
              <div className="text-slate-500">{"}"}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-ping" />
              <span>Live sirens active on facility speakers</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsAcknowledged(true);
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Acknowledge & Mobilize</span>
              </button>

              <button
                onClick={onClose}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
