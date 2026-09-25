import React, { useState } from 'react';
import { 
  Siren, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Send, 
  Bell, 
  Lock, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

export default function DispatchLog({ dispatchLogs, onOpenCriticalModal }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL', 'CRITICAL', 'SUSPICIOUS', 'NORMAL'
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredLogs = dispatchLogs.filter(log => {
    if (filter === 'ALL') return true;
    return log.status === filter;
  });

  const criticalCount = dispatchLogs.filter(l => l.status === 'CRITICAL').length;

  const getLogBadge = (log) => {
    switch (log.status) {
      case 'CRITICAL':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 border border-red-500/80 text-red-400 animate-pulse">
            <Siren className="w-3 h-3 text-red-400" />
            <span>AUTO-DISPATCHED</span>
          </span>
        );
      case 'SUSPICIOUS':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/80 text-amber-400">
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>GUARD NOTIFIED</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/60 text-emerald-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>LOGGED SILENTLY</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-[#10121d] border border-[#23273e] rounded-xl overflow-hidden shadow-xl transition-all font-mono">
      {/* Touchable Widget Header */}
      <div 
        onClick={() => setIsExpanded(v => !v)}
        className="px-4 py-2.5 bg-[#141726] border-b border-[#23273e] flex flex-wrap items-center justify-between gap-2 cursor-pointer hover:bg-[#181b30] transition-all select-none"
      >
        <div className="flex items-center gap-2.5">
          <Send className="w-4 h-4 text-[#c9a24b]" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Tiered Emergency & Guard Dispatch Log Widget
          </h3>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
            {dispatchLogs.length} events
          </span>
          {criticalCount > 0 && (
            <span className="text-[10px] font-mono font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/60 animate-pulse">
              {criticalCount} CRITICAL
            </span>
          )}
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {isExpanded && (
            <div className="flex items-center gap-1.5 text-xs font-mono mr-2">
              <span className="text-[10px] text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {['ALL', 'CRITICAL', 'SUSPICIOUS', 'NORMAL'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                    filter === f
                      ? 'bg-[#c9a24b] text-black font-bold'
                      : 'bg-[#181a2e] text-slate-400 hover:text-white border border-[#23273e]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsExpanded(v => !v)}
            className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 px-2.5 py-1 rounded border border-cyan-800/50 transition-all font-bold"
          >
            {isExpanded ? (
              <>
                <span>Touch to Hide Logs</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Touch to Expand Logs</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Table Body */}
      {isExpanded && (
        <div className="max-h-48 overflow-y-auto p-2 space-y-1.5 font-mono text-xs animate-fadeIn">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => log.status === 'CRITICAL' && onOpenCriticalModal(log)}
                className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border transition-all ${
                  log.status === 'CRITICAL'
                    ? 'bg-red-950/30 border-red-500/40 text-red-200 cursor-pointer hover:bg-red-950/50'
                    : log.status === 'SUSPICIOUS'
                    ? 'bg-amber-950/20 border-amber-500/30 text-amber-100'
                    : 'bg-[#141728] border-[#23273e] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 text-[11px] font-bold">
                    {log.timestamp}
                  </span>
                  <span className="text-slate-500">—</span>
                  <span className="text-slate-200 font-medium text-[11px]">
                    {log.message}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 hidden md:inline">
                    {log.zone || "Gate 1 Alpha"}
                  </span>
                  {getLogBadge(log)}
                  {log.status === 'CRITICAL' && (
                    <span className="text-[9px] underline text-red-400 hover:text-red-300">
                      View Dispatch &gt;
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-slate-500 text-xs">
              No dispatch entries matching filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
