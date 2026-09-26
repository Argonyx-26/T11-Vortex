// Twilio Higher Authority Voice Call Service for Vortex AI Security

const API_BASE = (typeof window !== 'undefined' && window.location.origin) ? '/api' : 'http://localhost:3001/api';

export const HIGHER_AUTHORITY_PHONE = '+91 94482 47676';
export const TWILIO_DISPATCHER_PHONE = '+1 (737) 221-2163';

let lastCallTimestamp = 0;
const CALL_COOLDOWN_MS = 30000; // 30s client cooldown to protect phone lines

export async function getTwilioStatus() {
  try {
    const res = await fetch(`${API_BASE}/twilio/status`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('[Twilio Service] Could not fetch status:', e);
  }
  return null;
}

export async function updateTwilioAuthToken(token) {
  try {
    const res = await fetch(`${API_BASE}/twilio/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authToken: token })
    });
    return await res.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function dispatchTwilioAuthorityCall({
  reason = 'Knife / weapon threat detected at checkpoint',
  threatScore = 95,
  subjectName = 'Subject',
  force = false
} = {}) {
  const now = Date.now();
  if (!force && (now - lastCallTimestamp < CALL_COOLDOWN_MS)) {
    const remaining = Math.round((CALL_COOLDOWN_MS - (now - lastCallTimestamp)) / 1000);
    console.log(`[Twilio Service] Call throttled: ${remaining}s cooldown remaining.`);
    return {
      success: true,
      cooldown: true,
      remainingSec: remaining,
      message: `Higher Authority already notified. Cooldown active (${remaining}s remaining).`
    };
  }

  try {
    const res = await fetch(`${API_BASE}/twilio/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason: `${reason} (Person: ${subjectName})`,
        threatScore,
        force
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        lastCallTimestamp = Date.now();
        window.dispatchEvent(new CustomEvent('twilio-call-dispatched', {
          detail: {
            timestamp: new Date().toISOString(),
            to: HIGHER_AUTHORITY_PHONE,
            from: TWILIO_DISPATCHER_PHONE,
            threatScore,
            reason,
            subjectName,
            ...data
          }
        }));
      }
      return data;
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || `Server responded with HTTP ${res.status}`,
        errorCode: errData.errorCode
      };
    }
  } catch (err) {
    console.error('[Twilio Service] Backend call proxy unavailable:', err);
    return {
      success: false,
      error: `Network error connecting to Vortex backend: ${err.message}`
    };
  }
}
