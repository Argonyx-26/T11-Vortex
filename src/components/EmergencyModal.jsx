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
  Radio,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { 
  dispatchTwilioAuthorityCall, 
  updateTwilioAuthToken,
  HIGHER_AUTHORITY_PHONE, 
  TWILIO_DISPATCHER_PHONE 
} from '../utils/twilioService';

export default function EmergencyModal({ isOpen, onClose, currentEvent, riskScore }) {
  const [etaSeconds, setEtaSeconds] = useState(192); // 3m 12s
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [callingAuthority, setCallingAuthority] = useState(false);
  const [twilioCallStatus, setTwilioCallStatus] = useState(null);
  const [twilioError, setTwilioError] = useState(null);
  const [callSid, setCallSid] = useState(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [newAuthToken, setNewAuthToken] = useState('');
  const [isUpdatingToken, setIsUpdatingToken] = useState(false);
  const [tokenSaveMessage, setTokenSaveMessage] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const processCallResult = (res) => {
    if (res?.success && (res?.callSid || res?.call?.sid)) {
      setCallSid(res.callSid || res.call.sid);
      setTwilioCallStatus('INITIATED • QUEUED');
      setTwilioError(null);
      setShowTokenInput(false);
    } else if (res?.cooldown) {
      setTwilioCallStatus(`COOLDOWN ACTIVE (${res.remainingSec}s)`);
      setTwilioError(null);
    } else {
      const errCode = res?.errorCode || res?.raw?.code;
      const errMsg = res?.error || res?.raw?.message || 'Call failed to dispatch';
      if (errCode === 20003 || errMsg.toLowerCase().includes('auth token') || errMsg.toLowerCase().includes('401') || res?.call?.httpStatus === 401) {
        setTwilioCallStatus('AUTH FAILED (401)');
        setTwilioError('Twilio Auth Token is invalid or expired. Paste new Auth Token from Twilio Console.');
        setShowTokenInput(true);
      } else if (errCode === 21212 || errCode === 21608 || errMsg.toLowerCase().includes('unverified')) {
        setTwilioCallStatus('UNVERIFIED NUMBER');
        setTwilioError('+91 94482 47676 is not verified in Twilio Console under Verified Caller IDs.');
      } else if (errCode === 21215 || errMsg.toLowerCase().includes('geo')) {
        setTwilioCallStatus('GEO PERMISSION BLOCKED');
        setTwilioError('Voice calls to India (+91) disabled in Twilio Console -> Voice -> Geo Permissions.');
      } else {
        setTwilioCallStatus('DISPATCH FAILED');
        setTwilioError(errMsg);
      }
    }
  };

  // Automatically trigger Twilio Call to Higher Authority on modal open
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const triggerAutoCall = async () => {
      setCallingAuthority(true);
      try {
        const res = await dispatchTwilioAuthorityCall({
          reason: 'Emergency Lockdown — Knife Weapon Threat Detected',
          threatScore: riskScore || 95,
          subjectName: currentEvent?.name || 'Subject'
        });
        if (isMounted) {
          setCallingAuthority(false);
          processCallResult(res);
        }
      } catch (e) {
        if (isMounted) {
          setCallingAuthority(false);
          setTwilioCallStatus('DISPATCH ERROR');
          setTwilioError(e.message);
        }
      }
    };

    triggerAutoCall();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleManualCall = async () => {
    setCallingAuthority(true);
    soundFx.playCritical();
    try {
      const res = await dispatchTwilioAuthorityCall({
        reason: 'Manual Higher Authority Escalation from Security Console',
        threatScore: riskScore || 95,
        subjectName: currentEvent?.name || 'Subject',
        force: true
      });
      setCallingAuthority(false);
      processCallResult(res);
    } catch (e) {
      setCallingAuthority(false);
      setTwilioCallStatus('DISPATCH ERROR');
      setTwilioError(e.message);
    }
  };

  const handleSaveTokenAndRetry = async (e) => {
    e?.preventDefault();
    if (!newAuthToken.trim()) return;
    setIsUpdatingToken(true);
    setTokenSaveMessage('Validating token with Twilio API...');
    try {
      const res = await updateTwilioAuthToken(newAuthToken.trim());
      if (res?.success) {
        setTokenSaveMessage('Token verified! Placing emergency call now...');
        const callRes = await dispatchTwilioAuthorityCall({
          reason: 'Emergency Lockdown Escalation',
          threatScore: riskScore || 95,
          subjectName: currentEvent?.name || 'Subject',
          force: true
        });
        setIsUpdatingToken(false);
        processCallResult(callRes);
      } else {
        setIsUpdatingToken(false);
        setTokenSaveMessage(`Token rejected: ${res?.details?.message || 'Invalid Auth Token'}`);
      }
    } catch (err) {
      setIsUpdatingToken(false);
      setTokenSaveMessage(`Error: ${err.message}`);
    }
  };

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
                  REAL TWILIO VOICE ACTIVE
                </span>
              </div>
              <h2 className="text-lg font-black tracking-wider uppercase mt-0.5">
                Automated Emergency Response & Authority Call Engaged
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
                {currentEvent?.zone || "Gate 1 - Checkpoint Optical"}
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">THREAT SEVERITY</div>
              <div className="font-bold text-red-400 text-sm mt-0.5">
                RISK {riskScore || 95}/100 • CRITICAL
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

          {/* REAL TWILIO VOICE CALL DISPATCH TO HIGHER AUTHORITY */}
          <div className="p-3.5 rounded-xl bg-[#141727] border-2 border-red-500/70 shadow-lg shadow-red-950/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <PhoneCall className={`w-4 h-4 ${twilioCallStatus?.includes('FAILED') || twilioCallStatus?.includes('ERROR') ? 'text-red-400' : 'text-red-400 animate-pulse'}`} />
                <span>Twilio Live Voice Call Dispatch → Higher Authority</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-black border flex items-center gap-1 ${
                twilioCallStatus?.includes('INITIATED') || twilioCallStatus?.includes('QUEUED')
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 animate-pulse'
                  : twilioCallStatus?.includes('COOLDOWN')
                  ? 'bg-amber-950/90 text-amber-300 border-amber-500'
                  : 'bg-red-950/90 text-red-300 border-red-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  twilioCallStatus?.includes('FAILED') || twilioCallStatus?.includes('ERROR') ? 'bg-red-500' : 'bg-emerald-400 animate-ping'
                }`}></span>
                <span>{twilioCallStatus || 'CONNECTING TWILIO...'}</span>
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0c0d16] border border-slate-800 text-xs leading-relaxed space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Target Authority Phone:</span>
                <span className="text-cyan-300 font-bold tracking-wide">{HIGHER_AUTHORITY_PHONE}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Outbound Twilio Caller ID:</span>
                <span className="text-slate-300">{TWILIO_DISPATCHER_PHONE}</span>
              </div>
              {callSid && (
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 pt-1 border-t border-white/5">
                  <span>TWILIO CALL SID:</span>
                  <span className="font-bold">{callSid}</span>
                </div>
              )}
            </div>

            {/* Error & Guidance Banner */}
            {twilioError && (
              <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/60 text-[11px] font-sans text-red-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-red-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Call Not Placed — Telephony Gateway Error</span>
                </div>
                <p className="text-[10px] leading-tight text-red-100">{twilioError}</p>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowTokenInput(prev => !prev)}
                    className="text-[10px] text-cyan-300 underline hover:text-cyan-200 font-mono"
                  >
                    {showTokenInput ? '▲ Hide Token Input' : '▼ Update Twilio Auth Token'}
                  </button>
                  <a
                    href="https://console.twilio.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-slate-300 hover:text-white underline font-mono"
                  >
                    Open Twilio Console ↗
                  </a>
                </div>
              </div>
            )}

            {/* Interactive Auth Token Updater */}
            {showTokenInput && (
              <form onSubmit={handleSaveTokenAndRetry} className="p-2.5 rounded-lg bg-[#0e101a] border border-cyan-500/40 space-y-2">
                <label className="block text-[10px] font-mono text-cyan-300">
                  Paste Active Twilio Auth Token:
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter 32-character Auth Token"
                    value={newAuthToken}
                    onChange={(e) => setNewAuthToken(e.target.value)}
                    className="flex-1 bg-black/60 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={isUpdatingToken || !newAuthToken.trim()}
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold disabled:opacity-50 flex items-center gap-1 font-mono"
                  >
                    {isUpdatingToken ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                    Save & Call
                  </button>
                </div>
                {tokenSaveMessage && (
                  <p className="text-[10px] font-mono text-amber-300">{tokenSaveMessage}</p>
                )}
              </form>
            )}

            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Triggered automatically upon weapon / knife detection.
              </span>
              <button
                type="button"
                disabled={callingAuthority}
                onClick={handleManualCall}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-600/30 transition-all active:scale-95 disabled:opacity-50"
              >
                {callingAuthority ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>Dialing Authority...</span>
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-3 h-3" />
                    <span>Call Authority Now (+91 94482 47676)</span>
                  </>
                )}
              </button>
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
              <div className="pl-4 text-slate-300">"checkpoint": "{currentEvent?.zone || "Gate 1 - Checkpoint Optical"}",</div>
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
