// Live Face Tracker & Sequential "Unknown User N" Session Engine
// Strictly uses registered personnel and assigns sequential Unknown User 1, 2, ...
// Never invents or generates random fake names!

import { getAuthorizedPersonnel } from './personnelStore';

// In-memory cache of distinct unrecognized faces seen in current session
let sessionUnknownFaces = [];

export function resetSessionUnknowns() {
  sessionUnknownFaces = [];
}

export function getSessionUnknownCount() {
  return sessionUnknownFaces.length;
}

// Vector distance between two biometric feature vectors
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

// Generate pseudo-encoding from string or seed if raw vector unavailable
export function generateFeatureVector(seedStr) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const vec = [];
  for (let i = 0; i < 16; i++) {
    const val = Math.sin(hash * (i + 1)) * 0.5;
    vec.push(parseFloat(val.toFixed(4)));
  }
  return vec;
}

/**
 * Live Face Identification Pipeline:
 * 1. Checks if face is present in frame.
 * 2. Compares strictly against registered authorized personnel in store.
 * 3. If unrecognized, matches against session's known "Unknown User N" or creates "Unknown User ${next}".
 * 4. NEVER invents fake random names.
 */
export function identifyLiveFace({ facePresent, encoding, nameHint, targetCamera = 'camera_1' }) {
  if (!facePresent) {
    return {
      facePresent: false,
      activeFace: null,
      inFramePersonnelId: null,
      label: null,
      status: 'CLEAR',
      isAuthorized: false,
      modifier: 0,
      timestamp: Date.now()
    };
  }

  const authorizedList = getAuthorizedPersonnel();

  // 1. Check against registered authorized personnel
  let matchedAuth = null;

  if (nameHint) {
    const lowerHint = nameHint.toLowerCase().trim();
    matchedAuth = authorizedList.find(p => {
      const lowerName = p.name.toLowerCase().trim();
      const lowerId = p.id.toLowerCase().trim();
      return (
        lowerName === lowerHint ||
        lowerId === lowerHint ||
        lowerName.includes(lowerHint) ||
        lowerHint.includes(lowerName)
      );
    });
  }

  if (!matchedAuth && encoding && Array.isArray(encoding)) {
    for (const person of authorizedList) {
      if (person.encoding && Array.isArray(person.encoding)) {
        const dist = vectorDistance(encoding, person.encoding);
        if (dist < 0.52) {
          matchedAuth = person;
          break;
        }
      }
    }
  }

  // If matched authorized person:
  if (matchedAuth) {
    return {
      facePresent: true,
      isAuthorized: true,
      name: matchedAuth.name,
      role: matchedAuth.role || 'Authorized Personnel',
      personId: matchedAuth.id,
      inFramePersonnelId: matchedAuth.id,
      label: `${matchedAuth.name} (AUTHORIZED)`,
      status: 'AUTHORIZED',
      modifier: 0,
      confidence: 99.2,
      timestamp: Date.now()
    };
  }

  // 2. Unregistered face: Must label as sequential "Unknown User N"
  const currentEncoding = encoding && Array.isArray(encoding) && encoding.length > 0 
    ? encoding 
    : generateFeatureVector(nameHint || `unknown_subject_${Date.now()}`);

  let existingUnknown = null;
  for (const unknown of sessionUnknownFaces) {
    const dist = vectorDistance(currentEncoding, unknown.encoding);
    if (dist < 0.48) {
      existingUnknown = unknown;
      break;
    }
  }

  if (existingUnknown) {
    // Reuse existing Unknown User N label
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
      confidence: 42.0,
      isReturningUnknown: true,
      timestamp: Date.now()
    };
  }

  // New distinct unrecognized face seen in session
  const nextNum = sessionUnknownFaces.length + 1;
  const newLabel = `Unknown User ${nextNum}`;
  const newEntry = {
    id: nextNum,
    label: newLabel,
    encoding: currentEncoding,
    firstSeen: new Date().toISOString()
  };
  sessionUnknownFaces.push(newEntry);

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
    confidence: 38.5,
    isNewUnknown: true,
    timestamp: Date.now()
  };
}
