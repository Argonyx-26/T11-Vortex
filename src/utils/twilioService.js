// Twilio Higher Authority Voice Call Service for Vortex AI Security

const API_BASE = 'http://localhost:3001/api';

export const HIGHER_AUTHORITY_PHONE = '+91 94482 47676';
export const TWILIO_DISPATCHER_PHONE = '+1 (737) 221-2163';

let lastCallTimestamp = 0;
const CALL_COOLDOWN_MS = 30000; // 30s client cooldown to protect phone lines

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
      return data;
    }
  } catch (err) {
    console.warn('[Twilio Service] Backend call proxy unavailable, attempting fallback:', err);
  }

  // Fallback: direct API call via standard form-encoded payload
  try {
    const accountSid = 'AC15e229b64622fb1895f658947b6942cf';
    const authToken = '924803f3610dd70faa2d16e379183b8e';
    const postData = new URLSearchParams({
      To: '+919448247676',
      From: '+17372212163',
      Url: 'https://webhooks.twilio.com/v1/Voice/Template/voice_speech_recognition'
    });

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
      },
      body: postData.toString()
    });

    const data = await res.json();
    lastCallTimestamp = Date.now();
    return {
      success: res.ok,
      call: {
        id: data.sid,
        sid: data.sid,
        status: data.status,
        to: HIGHER_AUTHORITY_PHONE,
        from: TWILIO_DISPATCHER_PHONE,
        threatScore
      }
    };
  } catch (err) {
    console.error('[Twilio Service] Fallback call failed:', err);
    return { success: false, error: err.message };
  }
}
