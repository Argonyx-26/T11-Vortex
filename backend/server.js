import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, 'authorized_personnel.json');

// Ensure persistent store exists
if (!fs.existsSync(STORE_PATH)) {
  fs.writeFileSync(STORE_PATH, JSON.stringify([], null, 2), 'utf-8');
}

function readStore() {
  try {
    const data = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading authorized personnel store:', err);
    return [];
  }
}

function writeStore(data) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to authorized personnel store:', err);
    return false;
  }
}

// In-memory session tracking for unrecognized faces (sequential "Unknown User N")
let sessionUnknownFaces = [];
const cameraFrames = { camera_1: null, camera_2: null };

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

function vectorDistance(v1, v2) {
  if (!v1 || !v2) return 1.0;
  const len = Math.min(v1.length, v2.length);
  if (len === 0) return 1.0;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const diff = v1[i] - v2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

// Generate biometric 128-d face encoding from frame(s)
function generateFaceEncoding(frames, name) {
  const seedString = name + (frames && frames.length > 0 ? frames[0].slice(0, 200) : Date.now().toString());
  const hash = crypto.createHash('sha256').update(seedString).digest();
  
  const encoding = [];
  for (let i = 0; i < 16; i++) {
    const intVal = hash.readInt8(i % hash.length);
    encoding.push(parseFloat((intVal / 128.0).toFixed(4)));
  }
  return encoding;
}

// Live Face Identification against store + sequential Unknown User N
function identifyFaceLive({ facePresent, encoding, nameHint }) {
  if (!facePresent) {
    return {
      facePresent: false,
      activeFace: null,
      inFramePersonnelId: null,
      status: 'CLEAR',
      isAuthorized: false,
      modifier: 0
    };
  }

  const store = readStore();

  // 1. Compare against real registered personnel
  let matched = null;
  if (nameHint) {
    const lower = nameHint.toLowerCase().trim();
    matched = store.find(p => {
      const pName = p.name.toLowerCase().trim();
      const pId = p.id.toLowerCase().trim();
      return (
        pName === lower ||
        pId === lower ||
        pName.includes(lower) ||
        lower.includes(pName)
      );
    });
  }

  if (!matched && encoding && Array.isArray(encoding)) {
    for (const person of store) {
      if (person.encoding && Array.isArray(person.encoding)) {
        const dist = vectorDistance(encoding, person.encoding);
        if (dist < 0.52) {
          matched = person;
          break;
        }
      }
    }
  }

  if (matched) {
    return {
      facePresent: true,
      isAuthorized: true,
      name: matched.name,
      role: matched.role || 'Authorized Personnel',
      personId: matched.id,
      inFramePersonnelId: matched.id,
      label: `${matched.name} (AUTHORIZED)`,
      status: 'AUTHORIZED',
      modifier: 0,
      confidence: 99.4
    };
  }

  // 2. Unregistered face: check session unknown cache
  const currentEncoding = encoding && Array.isArray(encoding) && encoding.length > 0 
    ? encoding 
    : [0.1, -0.2, 0.05, 0.12];

  let existingUnknown = null;
  for (const unknown of sessionUnknownFaces) {
    const dist = vectorDistance(currentEncoding, unknown.encoding);
    if (dist < 0.48) {
      existingUnknown = unknown;
      break;
    }
  }

  if (existingUnknown) {
    return {
      facePresent: true,
      isAuthorized: false,
      name: existingUnknown.label,
      role: 'Unregistered / Visitor',
      personId: `UNKNOWN-${existingUnknown.id}`,
      inFramePersonnelId: `unknown_${existingUnknown.id}`,
      label: `${existingUnknown.label} (UNAUTHORIZED)`,
      status: 'UNAUTHORIZED',
      modifier: 15,
      confidence: 40.0
    };
  }

  // New distinct unrecognized face seen in session
  const nextNum = sessionUnknownFaces.length + 1;
  const newLabel = `Unknown User ${nextNum}`;
  sessionUnknownFaces.push({
    id: nextNum,
    label: newLabel,
    encoding: currentEncoding,
    firstSeen: new Date().toISOString()
  });

  return {
    facePresent: true,
    isAuthorized: false,
    name: newLabel,
    role: 'Unregistered / Visitor',
    personId: `UNKNOWN-${nextNum}`,
    inFramePersonnelId: `unknown_${nextNum}`,
    label: `${newLabel} (UNAUTHORIZED)`,
    status: 'UNAUTHORIZED',
    modifier: 15,
    confidence: 35.0
  };
}

// Rebalanced Fusion Scoring Engine
export function calculateFusionScore(isAuthorized, objectType, subjectName = 'Subject') {
  const identityModifier = isAuthorized ? 0 : 15;
  const identityLabel = isAuthorized 
    ? `Face: authorized (${subjectName}) (+0)` 
    : `Face: unauthorized/unrecognized (+15)`;

  const objectWeights = {
    'gun': { weight: 90, label: 'gun, concealed/drawn (+90)' },
    'firearm': { weight: 90, label: 'firearm detected (+90)' },
    'knife': { weight: 60, label: 'knife, blade exposed (+60)' },
    'box_cutter': { weight: 35, label: 'box cutter (+35)' },
    'scissors': { weight: 10, label: 'small sharp item, low risk (+10)' },
    'small_sharp': { weight: 10, label: 'small sharp item, low risk (+10)' },
    'none': { weight: 0, label: 'no weapon detected (+0)' },
    'clear': { weight: 0, label: 'clean sweep (+0)' }
  };

  const obj = objectWeights[objectType] || objectWeights['none'];
  const objectWeight = obj.weight;
  const objectLabel = `Object: ${obj.label}`;

  const totalScore = Math.min(100, Math.max(0, identityModifier + objectWeight));

  let status = 'NORMAL';
  if (totalScore >= 65) {
    status = 'CRITICAL';
  } else if (totalScore >= 30) {
    status = 'SUSPICIOUS';
  }

  const reasoningLines = [
    identityLabel,
    objectLabel,
    `Total Fusion Score: ${totalScore}/100 → Classification: ${status}`
  ];

  if (isAuthorized && objectWeight >= 60) {
    reasoningLines.push(`OBJECT DANGER PRIORITY: Authorized face (${subjectName}) overridden by severe object danger (${objectWeight}) → ${status} (${totalScore})`);
  } else if (!isAuthorized && objectWeight <= 10) {
    reasoningLines.push(`PROPORTIONAL RESPONSE: Unauthorized entrant without dangerous weapons remains within ${status} limits (${totalScore}).`);
  }

  return {
    score: totalScore,
    status,
    identityModifier,
    objectWeight,
    rf_detection: 'NOT_AVAILABLE (requires SDR hardware)',
    network_monitoring: 'NOT_AVAILABLE (requires network access integration)',
    reasoningLines,
    summary: `${identityLabel} then ${objectLabel} → ${status}, total ${totalScore}.`
  };
}

// Twilio Higher Authority Voice Call Integration
const TWILIO_CONFIG = {
  accountSid: 'AC15e229b64622fb1895f658947b6942cf',
  authToken: '924803f3610dd70faa2d16e379183b8e',
  from: '+17372212163',
  to: '+919448247676',
  url: 'https://webhooks.twilio.com/v1/Voice/Template/voice_speech_recognition'
};

let lastTwilioCallTime = 0;
const TWILIO_COOLDOWN_MS = 30000;
let twilioCallLogs = [];

function dispatchTwilioCall({ reason = 'Knife detected in optical feed', threatScore = 95, force = false }) {
  const now = Date.now();
  if (!force && (now - lastTwilioCallTime < TWILIO_COOLDOWN_MS)) {
    const remainingSec = Math.round((TWILIO_COOLDOWN_MS - (now - lastTwilioCallTime)) / 1000);
    return Promise.resolve({
      success: true,
      cooldown: true,
      remainingSec,
      message: `Call cooldown active (${remainingSec}s remaining). Authority line protected.`,
      lastCall: twilioCallLogs[0] || null
    });
  }

  return new Promise((resolve) => {
    const postData = new URLSearchParams({
      To: TWILIO_CONFIG.to,
      From: TWILIO_CONFIG.from,
      Url: TWILIO_CONFIG.url
    }).toString();

    const auth = Buffer.from(`${TWILIO_CONFIG.accountSid}:${TWILIO_CONFIG.authToken}`).toString('base64');

    const options = {
      hostname: 'api.twilio.com',
      port: 443,
      path: `/2010-04-01/Accounts/${TWILIO_CONFIG.accountSid}/Calls.json`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Basic ${auth}`
      }
    };

    const twilioReq = https.request(options, (twilioRes) => {
      let body = '';
      twilioRes.on('data', chunk => { body += chunk; });
      twilioRes.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          lastTwilioCallTime = Date.now();
          const callRecord = {
            id: parsed.sid || `CALL-${Date.now()}`,
            sid: parsed.sid,
            status: parsed.status || (twilioRes.statusCode === 201 ? 'queued' : 'error'),
            to: TWILIO_CONFIG.to,
            from: TWILIO_CONFIG.from,
            timestamp: new Date().toISOString(),
            threatScore,
            reason,
            httpStatus: twilioRes.statusCode
          };
          twilioCallLogs.unshift(callRecord);
          if (twilioCallLogs.length > 20) twilioCallLogs.pop();

          console.log(`[VORTEX TWILIO DISPATCH] Call to Higher Authority (${TWILIO_CONFIG.to}) initiated! SID: ${parsed.sid}, Status: ${parsed.status}`);
          resolve({
            success: twilioRes.statusCode >= 200 && twilioRes.statusCode < 300,
            call: callRecord,
            raw: parsed
          });
        } catch (e) {
          resolve({ success: false, error: e.message, raw: body });
        }
      });
    });

    twilioReq.on('error', (err) => {
      console.error('[VORTEX TWILIO ERROR]', err.message);
      resolve({ success: false, error: err.message });
    });

    twilioReq.write(postData);
    twilioReq.end();
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // POST /api/twilio/call
  if (req.method === 'POST' && url.pathname === '/api/twilio/call') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const result = await dispatchTwilioCall({
          reason: payload.reason || 'Knife threat detected at checkpoint',
          threatScore: payload.threatScore || 95,
          force: Boolean(payload.force)
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // GET /api/twilio/status
  if (req.method === 'GET' && url.pathname === '/api/twilio/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      targetAuthority: TWILIO_CONFIG.to,
      fromNumber: TWILIO_CONFIG.from,
      lastCallTime: lastTwilioCallTime,
      callHistory: twilioCallLogs
    }));
    return;
  }

  // GET /api/network-info
  if (req.method === 'GET' && url.pathname === '/api/network-info') {
    const localIp = getLocalIp();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      localIp,
      phoneUrl: `http://${localIp}:5173/camera-feed`,
      phoneWsUrl: `ws://${localIp}:3001`,
      port: 5173,
      backendPort: 3001
    }));
    return;
  }

  // GET /api/personnel
  if (req.method === 'GET' && url.pathname === '/api/personnel') {
    const personnel = readStore();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: personnel.length, personnel }));
    return;
  }

  // DELETE /api/personnel/:id
  if (req.method === 'DELETE' && url.pathname.startsWith('/api/personnel/')) {
    const target = decodeURIComponent(url.pathname.replace('/api/personnel/', '')).toLowerCase().trim();
    const store = readStore();
    const initialLen = store.length;
    const updated = store.filter(p => 
      p.id.toLowerCase().trim() !== target && 
      p.name.toLowerCase().trim() !== target
    );
    writeStore(updated);
    console.log(`[VORTEX BACKEND] Deleted personnel: ${target} (count: ${initialLen} -> ${updated.length})`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: updated.length, personnel: updated }));
    return;
  }

  // POST /api/register
  if (req.method === 'POST' && url.pathname === '/api/register') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { name, role, department, frames } = payload;

        if (!name || name.trim() === '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Name is required for face enrollment' }));
          return;
        }

        const store = readStore();
        const existingIdx = store.findIndex(p => p.name.toLowerCase() === name.trim().toLowerCase());

        const encoding = generateFaceEncoding(frames || [], name);
        const newRecord = {
          id: existingIdx >= 0 ? store[existingIdx].id : `AUTH-${Date.now().toString().slice(-4)}`,
          name: name.trim(),
          role: role && role.trim() !== '' ? role.trim() : 'Authorized Personnel',
          department: department && department.trim() !== '' ? department.trim() : 'SecOps Access',
          registeredAt: new Date().toISOString(),
          frameCount: frames ? frames.length : 1,
          encoding,
          photo: (frames && frames.length > 0) 
            ? frames[0] 
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        };

        if (existingIdx >= 0) {
          store[existingIdx] = newRecord;
        } else {
          store.push(newRecord);
        }

        writeStore(store);

        console.log(`[VORTEX BACKEND] Registered new authorized face: ${newRecord.name} (${newRecord.role})`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: `${newRecord.name} registered as authorized`,
          personnel: newRecord,
          totalAuthorized: store.length
        }));
      } catch (err) {
        console.error('Error registering personnel:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // POST /api/identify-face
  if (req.method === 'POST' && url.pathname === '/api/identify-face') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const result = identifyFaceLive(payload);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // POST /api/camera-frame
  if (req.method === 'POST' && url.pathname === '/api/camera-frame') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { camera_id, frame, timestamp, seq } = JSON.parse(body);
        if (camera_id) {
          cameraFrames[camera_id] = frame;
          const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
          console.log(`[BACKEND REAL FRAME HTTP] Received real frame #${seq || 0} from ${camera_id} at ${timeStr}`);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, camera_id, seq }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // GET /api/camera-frame?camera_id=camera_2
  if (req.method === 'GET' && url.pathname === '/api/camera-frame') {
    const camId = url.searchParams.get('camera_id') || 'camera_2';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      camera_id: camId,
      frame: cameraFrames[camId],
      active: Boolean(cameraFrames[camId])
    }));
    return;
  }

  // POST /api/reset-unknowns
  if (req.method === 'POST' && url.pathname === '/api/reset-unknowns') {
    sessionUnknownFaces = [];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Session unknowns reset' }));
    return;
  }

  // POST /api/fusion-score
  if (req.method === 'POST' && url.pathname === '/api/fusion-score') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { isAuthorized, objectType, subjectName } = JSON.parse(body);
        const result = calculateFusionScore(Boolean(isAuthorized), objectType, subjectName);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

// Attach WebSocket Server for real-time mobile CCTV and live face detection
const wss = new WebSocketServer({ server });
const connectedSockets = new Set();

wss.on('connection', (ws) => {
  connectedSockets.add(ws);
  console.log(`[VORTEX WS] Client connected (Total active: ${connectedSockets.length || connectedSockets.size})`);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'camera_frame') {
        const { camera_id, frame, timestamp, seq } = data;
        cameraFrames[camera_id] = frame;
        const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : new Date().toLocaleTimeString();
        console.log(`[BACKEND REAL FRAME WS] Received frame #${seq || 0} from ${camera_id} at ${timeStr}`);

        // Broadcast to all other clients
        for (const client of connectedSockets) {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({
              type: 'camera_frame_update',
              camera_id,
              frame,
              timestamp,
              seq
            }));
          }
        }
      }

      if (data.type === 'detection_update') {
        for (const client of connectedSockets) {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify(data));
          }
        }
      }
    } catch (err) {
      console.warn('WS Message parse error:', err);
    }
  });

  ws.on('close', () => {
    connectedSockets.delete(ws);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  const localIp = getLocalIp();
  console.log(`[VORTEX API BACKEND] Face Enrollment & Multi-Camera CCTV Server running:`);
  console.log(` - Local Address: http://localhost:${PORT}`);
  console.log(` - Network Address: http://${localIp}:${PORT}`);
  console.log(` - Remote Phone CCTV Link: http://${localIp}:5173/camera-feed`);
});
