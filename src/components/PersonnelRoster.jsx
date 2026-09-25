import React from 'react';
import { Users, UserCheck, UserX, AlertTriangle, ShieldCheck, Radio } from 'lucide-react';

export default function PersonnelRoster({ 
  authorizedPersonnel = [], 
  currentDetectedFace = null,
  activeCameraId = 'camera_1'
}) {
  const activeInFrameId = currentDetectedFace?.facePresent ? currentDetectedFace?.inFramePersonnelId : null;
  const isUnauthorizedInFrame = currentDetectedFace?.facePresent && !currentDetectedFace?.isAuthorized;

  return (
    <div className="bg-[#10121d] border border-[#23273e] rounded-xl overflow-hidden shadow-xl flex flex-col font-mono text-xs">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#23273e] bg-[#141726] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[#c9a24b]" />
          <h3 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
            Live Personnel Roster & In-Frame Monitor
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-[9px] text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-500/30">
            WS LIVE 500ms
          </span>
        </div>
      </div>

      {/* Unrecognized / Unknown Intruder In-Frame Alert (if active) */}
      {isUnauthorizedInFrame && (
        <div className="p-2.5 bg-red-950/60 border-b border-red-500/60 flex items-center justify-between text-red-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
            <div>
              <div className="font-bold text-xs text-red-300">
                {currentDetectedFace?.name || "Unknown User 1"}
              </div>
              <div className="text-[10px] text-red-400/90">
                UNAUTHORIZED • IN FRAME AT {activeCameraId.toUpperCase()}
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-600 text-white animate-pulse">
            +15 PENALTY
          </span>
        </div>
      )}

      {/* Registered Personnel List */}
      <div className="p-2 space-y-1.5 max-h-52 overflow-y-auto">
        {authorizedPersonnel.map((person) => {
          const isInFrame = activeInFrameId === person.id || (
            currentDetectedFace?.facePresent && 
            currentDetectedFace?.name?.toLowerCase() === person.name.toLowerCase()
          );

          return (
            <div
              key={person.id}
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                isInFrame
                  ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/20'
                  : 'bg-[#141624] border-[#23273e] text-slate-400 opacity-80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={person.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                    alt={person.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#23273e]"
                  />
                  {isInFrame && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#10121d] animate-ping"></span>
                  )}
                </div>
                <div>
                  <div className={`font-sans font-bold text-xs ${isInFrame ? 'text-white' : 'text-slate-300'}`}>
                    {person.name}
                  </div>
                  <div className="text-[9px] font-mono text-slate-400 truncate max-w-[150px]">
                    {person.role}
                  </div>
                </div>
              </div>

              <div>
                {isInFrame ? (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    IN FRAME
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 bg-slate-900/60 border border-slate-800">
                    NOT IN FRAME
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
