// Client & Backend Persistent Store for Authorized Personnel and Rebalanced Fusion Scoring

const STORAGE_KEY = 'vortex_authorized_personnel';
const API_BASE = (typeof window !== 'undefined' && window.location.origin) ? '/api' : 'http://localhost:3001/api';

const DEFAULT_PERSONNEL = [
  {
    id: "AUTH-001",
    name: "Tanvi P G",
    role: "Team Lead / AI Architect",
    department: "R&D Biometrics",
    usn: "RVCE26BAS038",
    email: "tanvigokul08@gmail.com",
    registeredAt: "2026-09-25T10:00:00.000Z",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "AUTH-002",
    name: "Sanidhya",
    role: "Sensor Fusion Engineer",
    department: "Hardware Telemetry",
    usn: "RVCE26BAI088",
    email: "saniiiidhya@gmail.com",
    registeredAt: "2026-09-25T10:15:00.000Z",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "AUTH-003",
    name: "Krupanjali",
    role: "Threat Logic Specialist",
    department: "SecOps Intelligence",
    usn: "RVCE26BAI000",
    email: "krupanjali.bheemappa@gmail.com",
    registeredAt: "2026-09-25T10:30:00.000Z",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "AUTH-004",
    name: "Sagarika",
    role: "Security Ops Lead",
    department: "Emergency Dispatch",
    usn: "RVCE26BAS003",
    email: "sagarikaj1608@gmail.com",
    registeredAt: "2026-09-25T10:45:00.000Z",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80"
  }
];

export function getAuthorizedPersonnel() {
  if (typeof window === 'undefined') return DEFAULT_PERSONNEL;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn('LocalStorage read error, using default personnel:', err);
  }
  return DEFAULT_PERSONNEL;
}

export function saveAuthorizedPersonnel(personnel) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personnel));
    window.dispatchEvent(new CustomEvent('personnel-updated', { detail: personnel }));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

export function deleteAuthorizedPersonnel(idOrName) {
  if (!idOrName) return getAuthorizedPersonnel();
  const list = getAuthorizedPersonnel();
  const lower = idOrName.toLowerCase().trim();
  const updatedList = list.filter(p => 
    p.id.toLowerCase().trim() !== lower && 
    p.name.toLowerCase().trim() !== lower
  );
  saveAuthorizedPersonnel(updatedList);

  // Sync with backend if reachable
  try {
    fetch(`${API_BASE}/personnel/${encodeURIComponent(idOrName)}`, {
      method: 'DELETE'
    }).catch(() => {});
  } catch {}

  return updatedList;
}

export function resetAuthorizedPersonnelToDefaults() {
  saveAuthorizedPersonnel(DEFAULT_PERSONNEL);
  return DEFAULT_PERSONNEL;
}

export async function registerPersonnelOnlineOrOffline({ name, role, department, frames }) {
  const cleanName = name.trim();
  const cleanRole = (role && role.trim() !== '') ? role.trim() : 'Authorized Personnel';
  const cleanDept = (department && department.trim() !== '') ? department.trim() : 'General Operations';

  const newRecord = {
    id: `AUTH-${Date.now().toString().slice(-4)}`,
    name: cleanName,
    role: cleanRole,
    department: cleanDept,
    registeredAt: new Date().toISOString(),
    frameCount: frames ? frames.length : 1,
    photo: (frames && frames.length > 0)
      ? frames[0]
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  };

  // Try backend sync first
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, role: cleanRole, department: cleanDept, frames })
    });
    if (res.ok) {
      const data = await res.json();
      console.log('[Store] Backend registration successful:', data);
    }
  } catch {
    // Offline mode: proceed with client-side persistent storage
  }

  // Update local persistent store
  const list = getAuthorizedPersonnel();
  const existingIdx = list.findIndex(p => p.name.toLowerCase() === cleanName.toLowerCase());
  let updatedList;
  if (existingIdx >= 0) {
    updatedList = [...list];
    updatedList[existingIdx] = { ...list[existingIdx], ...newRecord };
  } else {
    updatedList = [newRecord, ...list];
  }

  saveAuthorizedPersonnel(updatedList);

  return {
    success: true,
    message: `${cleanName} registered as authorized`,
    personnel: newRecord,
    totalAuthorized: updatedList.length
  };
}

export function isPersonnelAuthorized(nameOrId) {
  if (!nameOrId) return false;
  const list = getAuthorizedPersonnel();
  const lower = nameOrId.toLowerCase().trim();
  return list.some(p => 
    p.name.toLowerCase().trim() === lower || 
    p.id.toLowerCase().trim() === lower ||
    lower.includes(p.name.toLowerCase().trim())
  );
}

// Exact User-Specified Rebalanced Scoring Engine
export function calculateRebalancedScore(isAuthorized, objectType, subjectName = 'Subject') {
  // Identity modifier: Authorized: +0, Unauthorized: +15
  const identityModifier = isAuthorized ? 0 : 15;
  const identityLabel = isAuthorized 
    ? `Face: authorized (${subjectName}) (+0)` 
    : `Face: unauthorized/unrecognized (+15)`;

  // Object weights:
  // gun: 90, knife/blade exposed: 60, box cutter: 35, scissors/small sharp object: 10, clean: 0
  const OBJECT_SPECS = {
    'gun': { weight: 90, name: 'gun', label: 'gun, concealed/drawn (+90)' },
    'firearm': { weight: 90, name: 'firearm', label: 'firearm detected (+90)' },
    'knife': { weight: 60, name: 'knife', label: 'knife, blade exposed (+60)' },
    'box_cutter': { weight: 35, name: 'box cutter', label: 'box cutter (+35)' },
    'scissors': { weight: 10, name: 'scissors/small sharp', label: 'small sharp item, low risk (+10)' },
    'small_sharp': { weight: 10, name: 'small sharp item', label: 'small sharp item, low risk (+10)' },
    'none': { weight: 0, name: 'none', label: 'no weapon detected (+0)' },
    'clear': { weight: 0, name: 'clear', label: 'clean sweep (+0)' }
  };

  const obj = OBJECT_SPECS[objectType] || OBJECT_SPECS['none'];
  const objectWeight = obj.weight;
  const objectLabel = `Object: ${obj.label}`;

  const rawScore = identityModifier + objectWeight;
  const totalScore = Math.min(100, Math.max(0, rawScore));

  // Classification thresholds:
  // 0-29 NORMAL, 30-64 SUSPICIOUS, 65-100 CRITICAL
  let status = 'NORMAL';
  if (totalScore >= 65) {
    status = 'CRITICAL';
  } else if (totalScore >= 30) {
    status = 'SUSPICIOUS';
  }

  // Generate plain-English reasoning lines as explicitly required
  const reasoningLines = [
    identityLabel,
    objectLabel,
    `Total Fusion Score: ${totalScore}/100 → Classification: ${status}`
  ];

  // Explicit comparative callout highlighting object danger priority
  if (isAuthorized && objectWeight >= 60) {
    reasoningLines.push(`OBJECT DANGER PRIORITY: Authorized face (${subjectName}) overridden by severe object danger (${objectWeight}) → ${status} (${totalScore})`);
  } else if (!isAuthorized && objectWeight <= 10) {
    reasoningLines.push(`PROPORTIONAL RESPONSE: Unauthorized entrant without dangerous weapons remains within ${status} limits (${totalScore}).`);
  } else if (objectWeight === 35) {
    reasoningLines.push(`ELEVATED THREAT: Concealed cutting utility (${objectWeight}) requires immediate onsite security escort.`);
  }

  return {
    score: totalScore,
    status,
    identityModifier,
    objectWeight,
    objectName: obj.name,
    reasoningLines,
    summary: `${identityLabel} then ${objectLabel} → ${status}, total ${totalScore}.`
  };
}
