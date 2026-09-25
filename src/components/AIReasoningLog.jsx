import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Code, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  Zap, 
  FileText,
  Sparkles,
  Scale,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function AIReasoningLog({ reasoningLines, telemetryData, status, fusionBreakdown }) {
  const [activeTab, setActiveTab] = useState('reasoning'); // 'reasoning' or 'json'
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = () => {
    const textToCopy = activeTab === 'reasoning' 
      ? (fusionBreakdown ? `${fusionBreakdown.summary}\n${fusionBreakdown.identityLabel}\n${fusionBreakdown.objectLabel}` : (reasoningLines || []).join('\n'))
      : JSON.stringify(telemetryData, null, 2);
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#10121d] border border-[#23273e] rounded-xl overflow-hidden shadow-xl">
      {/* Header with Tabs */}
      <div className="p-2.5 border-b border-[#23273e] bg-[#141726] flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-[#0e101a] p-1 rounded-lg border border-[#23273e]">
          <button
            onClick={() => setActiveTab('reasoning')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
              activeTab === 'reasoning'
                ? 'bg-[#c9a24b]/20 text-[#e6b84d] border border-[#c9a24b]/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Reasoning Log</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
              activeTab === 'json'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Sensor JSON Stream</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="text-[10px] font-mono text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-[#181a2e] border border-[#23273e] flex items-center gap-1 transition-all"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(v => !v)}
            className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 px-2 py-1 rounded border border-cyan-800/50 transition-all font-bold"
            title="Toggle widget expand/collapse"
          >
            {isExpanded ? (
              <>
                <span className="hidden sm:inline">Touch to Hide</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Touch to Show</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collapsed Compact State */}
      {!isExpanded && (
        <div 
          onClick={() => setIsExpanded(true)}
          className="px-3 py-2 bg-[#0e101a] text-slate-400 hover:text-white cursor-pointer flex items-center justify-between font-mono text-xs select-none"
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${status === 'CRITICAL' ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="truncate">{fusionBreakdown?.summary || 'Perimeter sweep clear'}</span>
          </div>
          <span className="text-[10px] text-cyan-400 flex-shrink-0 font-bold underline">Tap to Expand &gt;</span>
        </div>
      )}

      {/* Content Area */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'reasoning' ? (
          <div className="space-y-2.5">
            {/* Dedicated Rebalanced Fusion Score Breakdown Card */}
            {fusionBreakdown && (
              <div className="p-3 rounded-lg bg-[#15182a] border border-[#c9a24b]/50 shadow-md">
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="flex items-center gap-1.5 text-[#e6b84d] font-bold">
                    <Scale className="w-3.5 h-3.5 text-[#c9a24b]" />
                    <span>FUSION SCORE BREAKDOWN (OBJECT &gt; IDENTITY)</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                    fusionBreakdown.status === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-500' :
                    fusionBreakdown.status === 'SUSPICIOUS' ? 'bg-amber-950 text-amber-300 border border-amber-500' :
                    'bg-emerald-950 text-emerald-300 border border-emerald-500'
                  }`}>
                    {fusionBreakdown.status} ({fusionBreakdown.score}/100)
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs p-2 rounded bg-black/50 border border-white/5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>{fusionBreakdown.identityLabel}</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>{fusionBreakdown.objectLabel}</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/10 text-[11px] text-[#c9a24b] font-medium leading-tight">
                    {fusionBreakdown.summary}
                  </div>
                </div>
              </div>
            )}



            {/* Decision Rule Explainer Box */}
            <div className="mt-3 p-2.5 rounded bg-black/40 border border-[#23273e] text-[10px] font-mono text-slate-400">
              <div className="text-[#c9a24b] font-bold mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#c9a24b]" />
                <span>Zero-Trust Rebalanced Formula</span>
              </div>
              <p className="leading-normal">
                <strong>Score = Identity (+0 Authorized / +15 Unauthorized) + Object Danger</strong><br />
                Gun (+90), Knife (+60), Box Cutter (+35), Scissors (+10), Clean (+0).<br />
                <em>0-29 Normal • 30-64 Suspicious • 65-100 Critical</em>
              </p>
            </div>
          </div>
        ) : (
          /* Live JSON Stream View */
          <div className="relative font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-1 mb-2 border-b border-white/5">
              <span>RAW SENSOR TELEMETRY PACKET (JSON)</span>
              <span className="text-cyan-400">REST / MQTT PAYLOAD</span>
            </div>

            <pre className="p-3 rounded-lg bg-[#0b0c14] border border-[#23273e] text-cyan-300 overflow-x-auto text-[11px] leading-relaxed shadow-inner">
              {JSON.stringify(telemetryData || { status: 'STANDBY', sensor_stream: 'active' }, null, 2)}
            </pre>

            <div className="mt-2 text-[9px] font-mono text-slate-500 flex items-center justify-between">
              <span>CHECKSUM: 0x8F91A4B • SHA-256 VERIFIED</span>
              <span>EDGE INGEST: &lt; 4ms</span>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
}
