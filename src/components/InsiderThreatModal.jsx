import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  X, 
  Crosshair, 
  Radio, 
  Cpu, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { INSIDER_THREAT_DATA } from '../data/mockData';

export default function InsiderThreatModal({ 
  isOpen, 
  onClose, 
  onApplyScenario 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [threatSimEnabled, setThreatSimEnabled] = useState(false);

  if (!isOpen) return null;

  const activeData = (currentStep === 1 && !threatSimEnabled) 
    ? INSIDER_THREAT_DATA.step1 
    : INSIDER_THREAT_DATA.step2;

  const handleStep1 = () => {
    soundFx.playNormal();
    setCurrentStep(1);
    setThreatSimEnabled(false);
  };

  const handleStep2 = () => {
    soundFx.playCritical();
    setCurrentStep(2);
    setThreatSimEnabled(true);
  };

  const handleApplyToMainDashboard = () => {
    soundFx.playClick();
    onApplyScenario(activeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-2xl bg-[#0f111d] border-2 rounded-2xl shadow-2xl overflow-hidden font-mono transition-all duration-500 ${
        activeData.status === 'CRITICAL' 
          ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.35)]' 
          : 'border-[#c9a24b] shadow-[0_0_40px_rgba(201,162,75,0.25)]'
      }`}>
        {/* Header Strip */}
        <div className={`p-4 flex items-center justify-between text-white ${
          activeData.status === 'CRITICAL'
            ? 'bg-gradient-to-r from-red-900 to-red-700'
            : 'bg-gradient-to-r from-[#1c1810] to-[#2b2414] border-b border-[#c9a24b]/40'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-black/40 border border-white/20">
              <UserCheck className="w-5 h-5 text-[#e6b84d]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-black/40 text-amber-300">
                  SCRIPTED WALKTHROUGH
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                  ZERO TRUST DEMO
                </span>
                <span className="text-[9px] font-mono text-slate-300 bg-black/30 px-1.5 py-0.5 rounded border border-white/20">
                  Simulated for demo
                </span>
              </div>
              <h2 className="text-base font-black tracking-wider uppercase mt-0.5 text-white">
                "The Insider Threat" Demonstration Moment
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive 2-Step Bar */}
        <div className="p-4 border-b border-[#23273e] bg-[#141624]">
          <div className="grid grid-cols-2 gap-3">
            {/* Step 1 Button */}
            <button
              onClick={handleStep1}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentStep === 1 && !threatSimEnabled
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-[#181a2e] border-[#23273e] opacity-70 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>STEP 1: Scan Face</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Team Member: Tanvi P G (Lead)
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  Result: Authorized / NORMAL (12% Risk)
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">
                Authorized
              </span>
            </button>

            {/* Step 2 Button */}
            <button
              onClick={handleStep2}
              className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentStep === 2 || threatSimEnabled
                  ? 'bg-red-950/50 border-red-500 ring-2 ring-red-500/40 shadow-lg shadow-red-500/20'
                  : 'bg-[#181a2e] border-[#23273e] hover:border-red-500/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>STEP 2: Exposed Weapon / Blade</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Exposed Knife (Object Danger &gt; Identity)
                </div>
                <div className="text-[10px] text-red-400 font-mono">
                  Result: Escalate to CRITICAL (75% Risk)
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/20 text-red-300 animate-pulse">
                Escalate!
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Result Preview */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {/* Entrant Profile & Sensor Matrix */}
          <div className="p-3 rounded-xl bg-[#141728] border border-[#23273e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeData.entrant.avatar}
                alt="Tanvi P G"
                className="w-12 h-12 rounded-lg object-cover border border-[#c9a24b]"
              />
              <div>
                <div className="font-sans font-bold text-sm text-white">
                  {activeData.entrant.name}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {activeData.entrant.id} • {activeData.entrant.clearance}
                </div>
                <div className="text-[10px] font-mono text-cyan-400">
                  {activeData.entrant.department}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400">SYSTEM VERDICT</div>
              <div className={`text-base font-black font-mono mt-0.5 px-3 py-1 rounded-full border inline-block ${
                activeData.status === 'CRITICAL'
                  ? 'bg-red-950/80 border-red-500 text-red-400 animate-pulse'
                  : 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
              }`}>
                {activeData.status} ({activeData.riskScore}/100)
              </div>
            </div>
          </div>

          {/* Explainable AI Log Line */}
          <div className={`p-3.5 rounded-xl border ${
            activeData.status === 'CRITICAL'
              ? 'bg-red-950/30 border-red-500/50 text-red-200'
              : 'bg-[#141728] border-[#23273e] text-slate-200'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#c9a24b] mb-1.5">
              <Cpu className="w-4 h-4" />
              <span>Explainable AI Correlation Reasoning:</span>
            </div>
            <div className="space-y-1.5 text-xs leading-relaxed font-mono">
              {activeData.reasoning.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#c9a24b]">•</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Zero Trust Takeaway Box */}
          <div className="p-3 rounded-lg bg-black/40 border border-[#23273e] text-xs text-slate-300">
            <div className="text-amber-400 font-bold text-[11px] flex items-center gap-1.5 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero-Trust Principle (Object Danger &gt; Identity):</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Traditional access systems rely on ID badges and clean face scans. If an authorized employee carries an unauthorized weapon or exposed blade inside, standard systems fail completely. Vortex enforces <span className="text-white font-bold">Zero Trust</span>: object danger (+60 to +90) strictly overrides verified identity (+0), immediately escalating to CRITICAL.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#23273e] bg-[#121422] flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            Toggle above or apply this state directly to the main dashboard.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyToMainDashboard}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg ${
                activeData.status === 'CRITICAL'
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                  : 'bg-[#c9a24b] hover:bg-[#e6b84d] text-black font-extrabold shadow-[#c9a24b]/20'
              }`}
            >
              <span>Apply to Main Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
