import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  X, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Radio,
  RefreshCw,
  UserX,
  UserCheck
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { 
  dispatchTwilioAuthorityCall, 
  HIGHER_AUTHORITY_PHONE, 
  TWILIO_DISPATCHER_PHONE 
} from '../utils/twilioService';

export default function KnifeAlertModal({ 
  isOpen, 
  onClose, 
  personName = 'Subject',
  threatScore = 95,
  personPhoto = null,
  zone = 'Gate 1 - Checkpoint Optical',
  confidence = 88,
  isPenWeapon = false
}) {
  const [callingAuthority, setCallingAuthority] = useState(false);
  const [twilioCallStatus, setTwilioCallStatus] = useState(null);
  const [callSid, setCallSid] = useState(null);

  // Trigger 3s Alarm Clock sound effect when knife is detected and modal opens
  useEffect(() => {
    if (!isOpen) return;
    soundFx.playAlarmClock(3.0);
  }, [isOpen]);

  // Automatically trigger Twilio Call to Higher Authority on knife popup open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const triggerAutoCall = async () => {
      setCallingAuthority(true);
      try {
        const res = await dispatchTwilioAuthorityCall({
          reason: isPenWeapon 
            ? `CONCEALED WEAPON (PEN DETECTED AS KNIFE) in hands of ${personName}`
            : `KNIFE DETECTED in hands of ${personName}`,
          threatScore: threatScore || 95,
          subjectName: personName
        });
        if (isMounted) {
          setCallingAuthority(false);
          if (res?.callSid || res?.call?.sid) {
            setCallSid(res.callSid || res.call.sid);
            setTwilioCallStatus('INITIATED • QUEUED');
          } else if (res?.cooldown) {
            setTwilioCallStatus(`COOLDOWN ACTIVE (${res.remainingSec}s)`);
          } else {
            setTwilioCallStatus('DISPATCHED');
          }
        }
      } catch (e) {
        if (isMounted) {
          setCallingAuthority(false);
          setTwilioCallStatus('ERROR: ' + e.message);
        }
      }
    };

    triggerAutoCall();

    return () => {
      isMounted = false;
    };
  }, [isOpen, personName, threatScore, isPenWeapon]);

  const handleManualCall = async () => {
    setCallingAuthority(true);
    soundFx.playAlarmClock(3.0);
    try {
      const res = await dispatchTwilioAuthorityCall({
        reason: `Manual Knife Threat Escalation for ${personName}`,
        threatScore: threatScore || 95,
        subjectName: personName,
        force: true
      });
      setCallingAuthority(false);
      if (res?.callSid || res?.call?.sid) {
        setCallSid(res.callSid || res.call.sid);
        setTwilioCallStatus('LIVE CALL QUEUED');
      } else {
        setTwilioCallStatus('CALL DISPATCHED');
      }
    } catch (e) {
      setCallingAuthority(false);
      setTwilioCallStatus('ERROR: ' + e.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Red Glowing Ambient Pulse */}
      <div className="absolute inset-0 pointer-events-none bg-red-600/15 animate-pulse-critical"></div>

      <div className="relative w-full max-w-lg bg-[#0f111d] border-2 border-red-500 rounded-2xl shadow-[0_0_60px_rgba(239,68,68,0.6)] overflow-hidden font-mono text-slate-200">
        {/* Header: Flash Red Banner */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 p-3.5 sm:p-4 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-black/30 border border-white/20 animate-bounce flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase bg-black/40 px-2 py-0.5 rounded font-black tracking-widest text-red-200">
                  CRITICAL WEAPON ALERT
                </span>
                <span className="text-[10px] bg-white text-red-700 px-2 py-0.5 rounded font-bold animate-pulse">
                  PRIORITY 1
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-wider uppercase mt-0.5 text-white flex items-center gap-2">
                <span>⚠️ {isPenWeapon ? 'KNIFE DETECTED (PEN WEAPON)!' : 'KNIFE DETECTED!'}</span>
                <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black tracking-normal animate-pulse">
                  ⏰ ALARM (3s)
                </span>
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
        <div className="p-4 sm:p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
          {/* Armed Person Card & Escalated Score */}
          <div className="p-3.5 rounded-xl bg-red-950/60 border-2 border-red-500 shadow-md shadow-red-950/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={personPhoto || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
                  alt={personName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-400 ring-2 ring-red-500/50"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#10121d] animate-ping"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans font-bold text-white text-sm">{personName}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-red-600 text-white uppercase tracking-wider animate-pulse">
                    ARMED
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  {isPenWeapon ? `Concealed Pen Blade Detected in Hands (${confidence}% conf)` : `Lethal Blade Detected in Hands (${confidence}% conf)`}
                </div>
                <div className="text-[10px] text-red-300 font-bold mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{zone}</span>
                </div>
              </div>
            </div>

            {/* Direct Escalated Threat Score Badge */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Threat Score</span>
              <div className="text-3xl font-black text-red-400 font-mono tracking-tight animate-pulse">
                {threatScore}/100
              </div>
              <span className="px-2 py-0.5 rounded font-black text-[9px] bg-red-600 text-white uppercase tracking-wider mt-0.5 shadow-sm">
                CRITICAL
              </span>
            </div>
          </div>

          {/* Twilio Higher Authority Voice Call Status Card */}
          <div className="p-3.5 rounded-xl bg-[#141727] border border-red-500/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Twilio Live Call → Higher Authority</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{twilioCallStatus || 'CONNECTING...'}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0c0d16] border border-slate-800 text-[10px] space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Authority:</span>
                <span className="text-cyan-300 font-bold">{HIGHER_AUTHORITY_PHONE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Twilio Caller ID:</span>
                <span className="text-slate-300">{TWILIO_DISPATCHER_PHONE}</span>
              </div>
              {callSid && (
                <div className="flex justify-between text-emerald-400 pt-1 border-t border-white/5">
                  <span>CALL SID:</span>
                  <span className="font-bold">{callSid}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={callingAuthority}
              onClick={handleManualCall}
              className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {callingAuthority ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Dialing Higher Authority...</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Authority Now (+91 94482 47676)</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              Dismiss Pop-up
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all"
            >
              Acknowledge & Mobilize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
