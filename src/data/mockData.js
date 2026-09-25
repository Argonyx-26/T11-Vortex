// Sensor Telemetry and Hackathon Demo Scenarios for Vortex
// Cleaned of all simulated RF frequencies, fake signal strengths, and fake MAC/IP addresses.
// Honest "Not Available" states for hardware-dependent sensors (RF / SDR, Network Tap).

export const TEAM_MEMBERS = [
  {
    id: "RVCE26BAS038",
    name: "Tanvi P G",
    role: "Team Lead / AI Architect",
    email: "tanvigokul08@gmail.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    clearance: "LEVEL 5 (Top Secret)",
    department: "R&D Biometrics"
  },
  {
    id: "RVCE26BAI088",
    name: "Sanidhya",
    role: "Sensor Fusion Engineer",
    email: "saniiiidhya@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    clearance: "LEVEL 4",
    department: "Hardware Telemetry"
  },
  {
    id: "RVCE26BAI000",
    name: "Krupanjali",
    role: "Threat Logic Specialist",
    email: "krupanjali.bheemappa@gmail.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    clearance: "LEVEL 4",
    department: "SecOps Intelligence"
  },
  {
    id: "RVCE26BAS003",
    name: "Sagarika",
    role: "Security Ops Lead",
    email: "sagarikaj1608@gmail.com",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    clearance: "LEVEL 4",
    department: "Emergency Dispatch"
  }
];

export const INITIAL_EVENTS = [
  {
    id: "EVT-9041",
    timestamp: "12:25:40",
    name: "Dr. Krupanjali B.",
    empId: "EMP-2041",
    zone: "Gate 1 - North Executive",
    faceMatch: true,
    faceConfidence: 99.4,
    status: "NORMAL",
    riskScore: 12,
    sensors: {
      weapons: { state: "green", label: "Clear", detail: "Optical scan clean (+0)" },
      rf: { state: "disabled", label: "Not Available", detail: "Requires SDR hardware (0 contribution)" },
      motion: { state: "disabled", label: "Not Available", detail: "Passive ingress" },
      network: { state: "disabled", label: "Not Available", detail: "Requires network access integration" }
    },
    reasoning: [
      "Facial biometric match: 99.4% confidence (Dr. Krupanjali B. / SecOps) (+0)",
      "Real-time object detection: Clean / No weapon detected (+0)",
      "RF Detection: Not Available (requires SDR hardware — zero score contribution)",
      "Network Monitoring: Not Available (requires network access integration — zero score contribution)",
      "Verdict: Threat index low. Identity confirmed. Entry logged silently."
    ],
    telemetry: {
      face_identity: "AUTHORIZED (+0)",
      object_detected: "none (+0)",
      fusion_score: 12,
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      fusion_verdict: "CLEARED_NORMAL"
    }
  },
  {
    id: "EVT-9040",
    timestamp: "12:24:18",
    name: "Unknown User 1",
    empId: "UNK-1001",
    zone: "Gate 2 - Tech Vault",
    faceMatch: false,
    faceConfidence: 38.5,
    status: "SUSPICIOUS",
    riskScore: 45,
    sensors: {
      weapons: { state: "amber", label: "Box Cutter (+35)", detail: "Concealed utility cutter (+35)" },
      rf: { state: "disabled", label: "Not Available", detail: "Requires SDR hardware" },
      motion: { state: "disabled", label: "Not Available", detail: "Passive ingress" },
      network: { state: "disabled", label: "Not Available", detail: "Requires network access integration" }
    },
    reasoning: [
      "Facial biometric match: No match found in authorized personnel registry (+15 penalty)",
      "Real-time object detection: Box cutter detected (+35 danger weight)",
      "RF Detection: Not Available (requires SDR hardware — 0 risk contribution)",
      "Network Monitoring: Not Available (requires network access integration — 0 risk contribution)",
      "Total Fusion Score: 50/100 → SUSPICIOUS — Onsite patrol assigned to manual screening."
    ],
    telemetry: {
      face_identity: "UNAUTHORIZED (+15)",
      object_detected: "box_cutter (+35)",
      fusion_score: 50,
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      fusion_verdict: "ALERT_SUSPICIOUS"
    }
  },
  {
    id: "EVT-9039",
    timestamp: "12:22:50",
    name: "Sanidhya K.",
    empId: "EMP-4109",
    zone: "Gate 1 - North Executive",
    faceMatch: true,
    faceConfidence: 98.9,
    status: "NORMAL",
    riskScore: 14,
    sensors: {
      weapons: { state: "green", label: "Clear", detail: "Optical scan clean (+0)" },
      rf: { state: "disabled", label: "Not Available", detail: "Requires SDR hardware" },
      motion: { state: "disabled", label: "Not Available", detail: "Passive ingress" },
      network: { state: "disabled", label: "Not Available", detail: "Requires network access integration" }
    },
    reasoning: [
      "Facial biometric match: 98.9% confidence (Sanidhya K. / Sensor Fusion) (+0)",
      "Real-time object detection: Clean / No weapon detected (+0)",
      "RF & Network Monitoring: Not Available (zero score impact)",
      "Zero false alarms triggered. Entry logged silently."
    ],
    telemetry: {
      face_identity: "AUTHORIZED (+0)",
      object_detected: "none (+0)",
      fusion_score: 14,
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      fusion_verdict: "CLEARED_NORMAL"
    }
  }
];

// 3 Core Demo Scenario Events (Scripted Walkthrough for Demo Mode)
export const DEMO_SCENARIO_STEPS = [
  {
    stepIndex: 1,
    title: "Scenario 1: Normal Employee Clearance",
    subtitle: "Identity Verified (+0) + Clean Object Sweep (+0) → Silent Pass (No False Alarm)",
    entrant: {
      id: "EVT-DEMO-01",
      name: "Sagarika J.",
      empId: "EMP-1042",
      badge: "SecOps Lead (RVU Team)",
      zone: "Gate 1 - Alpha Main Entry",
      faceMatch: true,
      faceConfidence: 99.4,
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        delayMs: 600,
        stage: "ingestion",
        riskScore: 10,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Face match: 99.4% confidence (Sagarika J., RVU Team) (+0)",
        dispatchAction: null
      },
      {
        delayMs: 1600,
        stage: "fusion",
        riskScore: 12,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Vision sweep: Optical scan clean, no weapon detected (+0)",
        dispatchAction: null
      },
      {
        delayMs: 2700,
        stage: "correlation",
        riskScore: 12,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "RF & Network: Not Available (Requires hardware — zero risk addition)",
        dispatchAction: null
      },
      {
        delayMs: 3800,
        stage: "dispatch",
        riskScore: 12,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Verdict: NORMAL. Entry granted silently. Zero friction, false alarm prevented (+1).",
        dispatchAction: {
          type: "SILENT",
          text: "Silently logged (NORMAL) — Turnstile Alpha opened"
        }
      }
    ],
    finalTelemetry: {
      checkpoint: "Checkpoint Alpha (Gate 1)",
      face_identity: "AUTHORIZED (+0)",
      face_biometric_confidence: 0.994,
      weapon_detection: "NONE_DETECTED (+0)",
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      risk_classification: "NORMAL",
      dispatch_status: "SILENT_PASS"
    }
  },
  {
    stepIndex: 2,
    title: "Scenario 2: Authorized Staff with Exposed Weapon / Blade",
    subtitle: "Face Passes (+0), but Exposed Knife Overrides Clearance → SUSPICIOUS (Score 60)",
    entrant: {
      id: "EVT-DEMO-02",
      name: "Sanidhya",
      empId: "RVCE26BAI088",
      badge: "Sensor Fusion Engineer (RVU Team)",
      zone: "Gate 2 - Beta Server Vault",
      faceMatch: true,
      faceConfidence: 99.1,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        delayMs: 500,
        stage: "ingestion",
        riskScore: 15,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Face match: 99.1% confidence. Authorized engineer Sanidhya verified (+0).",
        dispatchAction: null
      },
      {
        delayMs: 1600,
        stage: "fusion",
        riskScore: 60,
        status: "SUSPICIOUS",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Weapon Vision Sweep: Knife with exposed blade detected in hand (+60 danger)",
        dispatchAction: null
      },
      {
        delayMs: 2900,
        stage: "correlation",
        riskScore: 60,
        status: "SUSPICIOUS",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "OBJECT DANGER OVERRIDE: Face (+0) + Knife (+60) = 60 → SUSPICIOUS",
        dispatchAction: null
      },
      {
        delayMs: 4000,
        stage: "dispatch",
        riskScore: 60,
        status: "SUSPICIOUS",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Escalated to SUSPICIOUS: Identity necessary but NOT sufficient. Onsite guard alerted.",
        dispatchAction: {
          type: "SUSPICIOUS",
          text: "Guard notified (SUSPICIOUS) — Escort & wand inspect Zone B visitor"
        }
      }
    ],
    finalTelemetry: {
      checkpoint: "Checkpoint Beta (Gate 2)",
      face_identity: "AUTHORIZED (+0)",
      face_biometric_confidence: 0.991,
      weapon_detection: "KNIFE_EXPOSED_BLADE (+60)",
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      risk_classification: "SUSPICIOUS",
      dispatch_status: "ONSITE_GUARD_ALERTED"
    }
  },
  {
    stepIndex: 3,
    title: "Scenario 3: Unmatched Face + Concealed Firearm Detected",
    subtitle: "Face Failure (+15) + Firearm Weapon (+90) → Score 95 CRITICAL Auto-Dispatch",
    entrant: {
      id: "EVT-DEMO-03",
      name: "Unknown User 1",
      empId: "UNK-0099",
      badge: "NO CREDENTIAL / BLACKLIST",
      zone: "Gate 1 - Alpha Main Entry",
      faceMatch: false,
      faceConfidence: 34.1,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
    },
    timeline: [
      {
        delayMs: 400,
        stage: "ingestion",
        riskScore: 15,
        status: "NORMAL",
        sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Face recognition mismatch: Unregistered entrant assigned Unknown User 1 (+15)",
        dispatchAction: null
      },
      {
        delayMs: 1400,
        stage: "fusion",
        riskScore: 95,
        status: "CRITICAL",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Neural Object Vision alert: Concealed firearm / handgun detected (+90 danger weight)",
        dispatchAction: null
      },
      {
        delayMs: 2700,
        stage: "correlation",
        riskScore: 95,
        status: "CRITICAL",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "AI Correlation: Unidentified intruder (+15) + concealed firearm (+90) = 95 CRITICAL",
        dispatchAction: null
      },
      {
        delayMs: 3800,
        stage: "dispatch",
        riskScore: 95,
        status: "CRITICAL",
        sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
        reasoningLine: "Escalated to CRITICAL: Auto-lockdown engaged. Emergency Police/EMS auto-dispatched.",
        dispatchAction: {
          type: "CRITICAL",
          text: "Police/EMS auto-dispatched (CRITICAL) — Turnstiles locked & Armed Unit routed"
        }
      }
    ],
    finalTelemetry: {
      checkpoint: "Checkpoint Alpha (Gate 1)",
      face_identity: "UNAUTHORIZED (+15)",
      face_biometric_confidence: 0.341,
      weapon_detection: "CONCEALED_FIREARM_PROFILE (+90)",
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      risk_classification: "CRITICAL",
      dispatch_status: "POLICE_EMS_AUTODISPATCHED"
    }
  }
];

// Data for "The Insider Threat" special demo feature (Scripted Walkthrough)
export const INSIDER_THREAT_DATA = {
  step1: {
    entrant: TEAM_MEMBERS[0], // Tanvi P G
    faceConfidence: 99.6,
    faceMatch: true,
    riskScore: 12,
    status: "NORMAL",
    sensorStates: { weapons: "green", rf: "disabled", motion: "disabled", network: "disabled" },
    reasoning: [
      "Facial biometric scan: 99.6% match — Tanvi P G (Team Lead / RVU) (+0)",
      "Access Level: LEVEL 5 (Top Secret Vault Clearance)",
      "Vision Object Detection: Clean / No weapon detected (+0)",
      "RF & Network Monitoring: Not Available (requires SDR/network integration — 0 risk)",
      "Status: NORMAL / AUTHORIZED — Standard entry granted silently."
    ],
    telemetry: {
      entrant_id: "RVCE26BAS038",
      name: "Tanvi P G",
      authorization_status: "AUTHORIZED (+0)",
      face_confidence: "99.6%",
      weapon_detected: "none (+0)",
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      threat_level: "NORMAL (12/100)"
    }
  },
  step2: {
    entrant: TEAM_MEMBERS[0],
    faceConfidence: 99.6,
    faceMatch: true,
    riskScore: 75,
    status: "CRITICAL",
    sensorStates: { weapons: "red", rf: "disabled", motion: "disabled", network: "disabled" },
    reasoning: [
      "Facial biometric scan: 99.6% match — Authorized Staff (Tanvi P G) (+0)",
      "ZERO TRUST ENFORCEMENT: Identity is necessary, but never sufficient!",
      "OBJECT DANGER OVERRIDE: Exposed blade / knife detected in hand (+60 to +75 danger weight)",
      "AI Correlation: Flagged: Authorized ID [Tanvi P G] + Dangerous Object Detected",
      "Immediate Escalation: CRITICAL (Risk 75/100) — Turnstiles locked, Security and Tactical dispatched."
    ],
    telemetry: {
      entrant_id: "RVCE26BAS038",
      name: "Tanvi P G",
      authorization_status: "AUTHORIZED_ID_CONFIRMED (+0)",
      face_confidence: "99.6%",
      weapon_detected: "KNIFE_BLADE_EXPOSED (+60)",
      rf_detection: "NOT_AVAILABLE (requires SDR hardware)",
      network_monitoring: "NOT_AVAILABLE (requires network access integration)",
      threat_level: "CRITICAL (75/100)",
      rule_triggered: "OBJECT_DANGER_PRIORITY_V4"
    }
  }
};

// Initial dispatch log entries (Simulated baseline for demo)
export const INITIAL_DISPATCH_LOG = [
  {
    id: "DISP-101",
    timestamp: "12:20:15",
    type: "SILENT",
    status: "NORMAL",
    badge: "PASS",
    message: "Checkpoint Alpha — Employee EVT-9037 cleared silently (No false alarm)",
    zone: "Gate 1 - North Executive",
    isSimulated: true
  },
  {
    id: "DISP-102",
    timestamp: "12:24:22",
    type: "SUSPICIOUS",
    status: "SUSPICIOUS",
    badge: "GUARD ALERT",
    message: "Guard notified (SUSPICIOUS) — Box cutter detected on visitor at Gate 2",
    zone: "Gate 2 - Tech Vault",
    isSimulated: true
  }
];
