import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  ShieldCheck, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Building2, 
  CreditCard,
  Trash2,
  RotateCcw,
  X,
  ShieldAlert
} from 'lucide-react';
import { deleteAuthorizedPersonnel, resetAuthorizedPersonnelToDefaults } from '../utils/personnelStore';
import { soundFx } from '../utils/audio';

export default function PersonnelRoster({ 
  authorizedPersonnel = [], 
  currentDetectedFace = null,
  inFrameIds = [],
  isKnifeDetected = false,
  knifeHolderId = null,
  threatScore = 0,
  activeCameraId = 'camera_1',
  onDeletePersonnel = null,
  onResetPersonnel = null
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedPersonId, setExpandedPersonId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [notification, setNotification] = useState(null);

  const activeInFrameId = currentDetectedFace?.facePresent ? currentDetectedFace?.inFramePersonnelId : null;
  const isUnauthorizedInFrame = currentDetectedFace?.facePresent && !currentDetectedFace?.isAuthorized;

  // Track who is armed with knife
  const effectiveKnifeDetected = isKnifeDetected || currentDetectedFace?.isKnifeDetected || threatScore >= 75;

  const inFrameCount = authorizedPersonnel.filter((p, index) => (
    inFrameIds.includes(p.id) ||
    activeInFrameId === p.id ||
    (currentDetectedFace?.inFrameIds && currentDetectedFace.inFrameIds.includes(p.id)) ||
    (currentDetectedFace?.facePresent && currentDetectedFace?.name?.toLowerCase() === p.name.toLowerCase()) ||
    (currentDetectedFace?.facePresent && currentDetectedFace?.faceCount >= 2 && index < currentDetectedFace.faceCount)
  )).length;

  const handleDelete = (id, name) => {
    soundFx.playAlert();
    if (onDeletePersonnel) {
      onDeletePersonnel(id);
    } else {
      deleteAuthorizedPersonnel(id);
    }
    setConfirmDeleteId(null);
    setNotification(`Deleted ${name} from registered personnel database`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleReset = () => {
    soundFx.playClick();
    if (onResetPersonnel) {
      onResetPersonnel();
    } else {
      resetAuthorizedPersonnelToDefaults();
    }
    setNotification('Restored default authorized personnel roster (4 profiles)');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#10121d] border border-[#23273e] rounded-xl overflow-hidden shadow-xl flex flex-col font-mono text-xs transition-all">
      {/* Touchable Widget Header */}
      <div 
        onClick={() => setIsExpanded(v => !v)}
        className="px-3 py-2 border-b border-[#23273e] bg-[#141726] flex items-center justify-between cursor-pointer hover:bg-[#181b30] transition-all select-none"
      >
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[#c9a24b]" />
          <h3 className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">
            Live Personnel Roster Widget
          </h3>
          <span className="text-[9px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">
            {authorizedPersonnel.length} Enrolled
          </span>
          {authorizedPersonnel.length < 4 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="text-[8px] font-mono text-cyan-400 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/80 px-1.5 py-0.5 rounded border border-cyan-700/50 flex items-center gap-0.5 transition-all"
              title="Restore default enrolled personnel roster"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Restore</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {effectiveKnifeDetected ? (
            <span className="text-[9px] font-bold text-red-300 bg-red-950/90 px-2 py-0.5 rounded border border-red-500 animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-yellow-300" />
              ARMED (95)
            </span>
          ) : inFrameCount > 0 ? (
            <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {inFrameCount} IN FEED
            </span>
          ) : (
            <span className="text-[9px] text-slate-500 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800">
              STANDBY
            </span>
          )}

          <button
            onClick={() => setIsExpanded(v => !v)}
            className="flex items-center gap-1 text-[9px] font-mono text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-800/50 transition-all font-bold ml-1"
          >
            {isExpanded ? (
              <>
                <span className="hidden sm:inline">Touch to Hide</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Touch to Show</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification banner for deletion/reset */}
      {notification && (
        <div className="px-3 py-1.5 bg-amber-950/90 border-b border-amber-500/60 text-amber-200 text-[10px] flex items-center justify-between animate-fadeIn">
          <span className="font-bold">{notification}</span>
          <button onClick={() => setNotification(null)} className="text-amber-400 hover:text-white p-0.5">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

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

      {/* Collapsed Compact Preview Bar */}
      {!isExpanded && (
        <div 
          onClick={() => setIsExpanded(true)}
          className="p-2.5 bg-[#0e101a] text-slate-400 hover:text-white cursor-pointer flex items-center justify-between font-mono text-xs select-none"
        >
          <div className="flex items-center gap-2">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {inFrameCount > 0 
                ? `${inFrameCount} Authorized Personnel active in optical checkpoint` 
                : 'Checkpoint ingress clean. Touch to view enrolled personnel cards.'}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400 underline font-bold">Touch to Expand &gt;</span>
        </div>
      )}

      {/* Registered Personnel List with Touch-to-Reveal Profile Cards & Delete Option */}
      {isExpanded && (
        <div className="p-2 space-y-1.5 overflow-y-auto max-h-[620px] animate-fadeIn">
          <div className="text-[9px] text-slate-500 font-mono px-1 flex items-center justify-between">
            <span>TOUCH CARD FOR BIO • TRASH ICON TO DELETE:</span>
            <span>{authorizedPersonnel.length} PROFILES</span>
          </div>

          {authorizedPersonnel.length === 0 ? (
            <div className="p-4 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-lg my-2">
              <UserX className="w-6 h-6 mx-auto mb-1 text-slate-600" />
              <div>No registered personnel enrolled.</div>
              <button
                onClick={handleReset}
                className="mt-2 px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded text-[10px] font-bold hover:bg-cyan-900"
              >
                Restore Default Roster
              </button>
            </div>
          ) : (
            authorizedPersonnel.map((person, index) => {
              const isInFrame = (
                inFrameIds.includes(person.id) ||
                activeInFrameId === person.id ||
                (currentDetectedFace?.inFrameIds && currentDetectedFace.inFrameIds.includes(person.id)) ||
                (currentDetectedFace?.facePresent && currentDetectedFace?.name?.toLowerCase() === person.name.toLowerCase()) ||
                (currentDetectedFace?.facePresent && currentDetectedFace?.faceCount >= 2 && index < currentDetectedFace.faceCount)
              );

              // Weapon attribution: If knife is visible and this person is in frame, their threat score spikes!
              const isHoldingKnife = isInFrame && effectiveKnifeDetected && (
                knifeHolderId ? (knifeHolderId === person.id || inFrameCount <= 1) : true
              );

              // Escalated threat score: increases to 95 when knife shown
              const individualScore = isHoldingKnife 
                ? (threatScore >= 65 ? threatScore : 95) 
                : (isInFrame ? 10 : 0);

              const isCardDetailExpanded = expandedPersonId === person.id;
              const isConfirmingDelete = confirmDeleteId === person.id;

              return (
                <div
                  key={person.id}
                  onClick={() => setExpandedPersonId(prev => prev === person.id ? null : person.id)}
                  className={`p-2.5 rounded-lg border transition-all duration-300 flex flex-col gap-2 cursor-pointer ${
                    isHoldingKnife
                      ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500 shadow-xl shadow-red-500/30'
                      : isInFrame
                      ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/20'
                      : 'bg-[#141624] border-[#23273e] text-slate-400 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img
                          src={person.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt={person.name}
                          className={`w-9 h-9 rounded-full object-cover border ${
                            isHoldingKnife ? 'border-red-500 ring-2 ring-red-400' : isInFrame ? 'border-emerald-400' : 'border-[#23273e]'
                          }`}
                        />
                        {isHoldingKnife ? (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#10121d] animate-ping"></span>
                        ) : isInFrame ? (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#10121d] animate-ping"></span>
                        ) : null}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`font-sans font-bold text-xs ${
                            isHoldingKnife ? 'text-red-200' : isInFrame ? 'text-white' : 'text-slate-300'
                          }`}>
                            {person.name}
                          </span>
                          {isHoldingKnife && (
                            <span className="px-1.5 py-0.2 rounded text-[8px] font-black bg-red-600 text-white uppercase tracking-wider animate-pulse">
                              ARMED
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 truncate max-w-[140px]">
                          {person.role}
                        </div>
                        {/* Threat Score per Individual - Escalates when knife is visible */}
                        <div className="text-[9px] font-mono mt-0.5">
                          {isHoldingKnife ? (
                            <span className="text-red-400 font-extrabold flex items-center gap-1">
                              <AlertTriangle className="w-2.5 h-2.5 text-yellow-300 inline" />
                              <span>THREAT SCORE: <strong className="text-white bg-red-600 px-1 py-0.2 rounded font-black text-[10px]">{individualScore}/100</strong> (CRITICAL)</span>
                            </span>
                          ) : isInFrame ? (
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 inline" />
                              <span>Score: {individualScore}/100 (AUTHORIZED)</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">
                              Score: 0/100 (STANDBY)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {isHoldingKnife ? (
                        <span className="px-2 py-1 rounded text-[9px] font-black bg-red-600 text-white border border-red-400 flex items-center gap-1 shadow-md shadow-red-500/50 animate-bounce">
                          <AlertTriangle className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                          <span>ARMED ({individualScore})</span>
                        </span>
                      ) : isInFrame ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>IN FRAME (10)</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-500 bg-slate-900/60 border border-slate-800">
                          STANDBY (0)
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        {/* Inline Delete Button & Confirmation */}
                        <div onClick={(e) => e.stopPropagation()}>
                          {isConfirmingDelete ? (
                            <div className="flex items-center gap-1 bg-red-950/90 border border-red-500 px-2 py-0.5 rounded text-[9px] animate-fadeIn">
                              <span className="text-red-200 font-bold">Delete {person.name.split(' ')[0]}?</span>
                              <button
                                type="button"
                                onClick={() => handleDelete(person.id, person.name)}
                                className="px-1.5 py-0.5 bg-red-600 hover:bg-red-500 text-white rounded font-black text-[9px] transition-all"
                                title="Confirm deletion"
                              >
                                YES
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[9px] transition-all"
                                title="Cancel"
                              >
                                NO
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(person.id)}
                              className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-950/60 border border-transparent hover:border-red-800/60 transition-all flex items-center gap-1 text-[9px]"
                              title={`Delete ${person.name} from registered personnel`}
                            >
                              <Trash2 className="w-3 h-3 text-slate-500 hover:text-red-400" />
                              <span className="text-[9px] text-slate-500 hover:text-red-300">Delete</span>
                            </button>
                          )}
                        </div>

                        <span className="text-[8px] text-slate-500 font-mono flex items-center gap-0.5">
                          <span>{isCardDetailExpanded ? 'Hide Bio' : 'Touch Bio'}</span>
                          {isCardDetailExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Touch-to-Reveal Detailed Bio & Security Credential Card */}
                  {isCardDetailExpanded && (
                    <div className="pt-2 border-t border-white/10 grid grid-cols-1 gap-1 text-[9px] text-slate-300 bg-black/40 p-2 rounded animate-fadeIn">
                      <div className="flex items-center gap-1 text-slate-400">
                        <CreditCard className="w-2.5 h-2.5 text-[#c9a24b]" />
                        <span className="font-bold">Credential USN:</span>
                        <span className="text-white font-mono">{person.usn || person.id}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Building2 className="w-2.5 h-2.5 text-cyan-400" />
                        <span className="font-bold">Division:</span>
                        <span className="text-white">{person.department || "General Operations"}</span>
                      </div>
                      {person.email && (
                        <div className="flex items-center gap-1 text-slate-400 truncate">
                          <Mail className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="font-bold">Email:</span>
                          <span className="text-cyan-300 truncate">{person.email}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-emerald-400 text-[8px] font-bold mt-1 pt-1 border-t border-white/5">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Zero-Trust Facial Biometric Enrolled (+0)</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(person.id);
                          }}
                          className="px-2 py-0.5 bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-red-300 rounded flex items-center gap-1 text-[8px] transition-all font-bold"
                          title="Delete this registered person"
                        >
                          <Trash2 className="w-2.5 h-2.5 text-red-400" />
                          <span>Remove Profile</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
