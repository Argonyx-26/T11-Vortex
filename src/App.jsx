import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import EventFeed from './components/EventFeed';
import RiskCenter from './components/RiskCenter';
import AIReasoningLog from './components/AIReasoningLog';
import DispatchLog from './components/DispatchLog';
import EmergencyModal from './components/EmergencyModal';
import InsiderThreatModal from './components/InsiderThreatModal';
import RegisterModal from './components/RegisterModal';
import PersonnelRoster from './components/PersonnelRoster';
import PhoneCameraModal from './components/PhoneCameraModal';
import { 
  INITIAL_EVENTS, 
  INITIAL_DISPATCH_LOG, 
  DEMO_SCENARIO_STEPS, 
  TEAM_MEMBERS 
} from './data/mockData';
import { soundFx } from './utils/audio';
import { getAuthorizedPersonnel, calculateRebalancedScore } from './utils/personnelStore';
import { identifyLiveFace } from './utils/faceTracker';

export default function App() {
  // Main states
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [currentEvent, setCurrentEvent] = useState(INITIAL_EVENTS[0]);
  const [currentScore, setCurrentScore] = useState(12);
  const [currentStatus, setCurrentStatus] = useState('NORMAL');
  const [facilityStatus, setFacilityStatus] = useState('NORMAL');
  const [falseAlarmsPrevented, setFalseAlarmsPrevented] = useState(142);
  const [dispatchLogs, setDispatchLogs] = useState(INITIAL_DISPATCH_LOG);

  // Authorized personnel list
  const [authorizedPersonnel, setAuthorizedPersonnel] = useState(getAuthorizedPersonnel());

  // Rebalanced fusion states
  const [activeObject, setActiveObject] = useState('none');
  const [fusionBreakdown, setFusionBreakdown] = useState({
    identityLabel: 'Face: authorized (Dr. Krupanjali B.) (+0)',
    objectLabel: 'Object: no weapon detected (+0)',
    score: 12,
    status: 'NORMAL',
    summary: 'Face: authorized (Dr. Krupanjali B.) (+0) then Object: clean (+0) → NORMAL, total 12.'
  });

  // Live Face Detection & In-Frame Tracking (WS & Local)
  const [isFaceInFrame, setIsFaceInFrame] = useState(true);
  const [currentLiveFace, setCurrentLiveFace] = useState(() => 
    identifyLiveFace({ facePresent: true, nameHint: 'Tanvi P G' })
  );
  const [activeCameraId, setActiveCameraId] = useState('camera_1');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [localIp, setLocalIp] = useState('localhost');

  // Architecture & Audio & HUD states
  const [activeStage, setActiveStage] = useState(null);
  const [showArchitecture, setShowArchitecture] = useState(true);
  const [useWebcam, setUseWebcam] = useState(true);

  // Synchronized refs to prevent stale closures and isolate demo mode
  const isDemoRunningRef = useRef(false);
  const useWebcamRef = useRef(true);
  const activeCameraIdRef = useRef(activeCameraId);
  const manualOverrideUntilRef = useRef(0);

  // Modals
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showInsiderThreatModal, setShowInsiderThreatModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Manual interactive sensor toggles
  const [manualSensors, setManualSensors] = useState({
    weapons: false,
    rf: false,
    motion: false,
    network: false
  });

  // Demo Scenario state
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoBannerText, setDemoBannerText] = useState(null);
  const demoTimeoutsRef = useRef([]);

  useEffect(() => {
    isDemoRunningRef.current = isDemoRunning;
  }, [isDemoRunning]);

  useEffect(() => {
    useWebcamRef.current = useWebcam;
  }, [useWebcam]);

  useEffect(() => {
    activeCameraIdRef.current = activeCameraId;
  }, [activeCameraId]);

  // Clear demo timeouts on unmount or reset
  const clearDemoTimeouts = () => {
    demoTimeoutsRef.current.forEach(clearTimeout);
    demoTimeoutsRef.current = [];
  };

  const getFormatTime = () => {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { hour12: false });
  };

  // Listen for personnel updates from localStorage
  useEffect(() => {
    const handlePersonnelUpdated = (e) => {
      if (e.detail) {
        setAuthorizedPersonnel(e.detail);
      }
    };
    window.addEventListener('personnel-updated', handlePersonnelUpdated);
    return () => window.removeEventListener('personnel-updated', handlePersonnelUpdated);
  }, []);

  // Fetch network IP for local phone camera URL
  useEffect(() => {
    fetch('http://localhost:3001/api/network-info')
      .then(r => r.json())
      .then(d => {
        if (d.localIp) setLocalIp(d.localIp);
      })
      .catch(() => {});
  }, []);

  // Real-time WebSocket connection for phone camera frames & face detection events
  useEffect(() => {
    let ws = null;
    try {
      const host = window.location.hostname || 'localhost';
      ws = new WebSocket(`ws://${host}:3001`);
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'camera_frame_update' && msg.camera_id === 'camera_2') {
            try {
              localStorage.setItem('vortex_camera_2_frame', msg.frame);
            } catch {}
            window.dispatchEvent(new CustomEvent('camera_2_frame_updated', { detail: { frame: msg.frame } }));
          }
          if (msg.type === 'detection_update' && msg.detection) {
            // Isolate: Do not overwrite live camera detections if demo is running or if CAM-01 is actively running real inference
            if (isDemoRunningRef.current || (useWebcamRef.current && activeCameraIdRef.current === 'camera_1')) {
              return;
            }
            const d = msg.detection;
            if (d.facePresent !== undefined) {
              setIsFaceInFrame(d.facePresent);
              if (d.facePresent) {
                const detected = identifyLiveFace({
                  facePresent: true,
                  nameHint: d.name,
                  encoding: d.encoding
                });
                setCurrentLiveFace(detected);
              } else {
                setCurrentLiveFace({
                  facePresent: false,
                  activeFace: null,
                  inFramePersonnelId: null,
                  label: null,
                  name: null,
                  isAuthorized: false
                });
              }
            }
          }
        } catch (e) {}
      };
    } catch (e) {}

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // Toggle face presence in camera frame (Move Out of Frame / Step Into Frame)
  const handleToggleFaceInFrame = (inFrame) => {
    soundFx.playClick();
    setIsFaceInFrame(inFrame);
    if (!inFrame) {
      setCurrentLiveFace({
        facePresent: false,
        activeFace: null,
        inFramePersonnelId: null,
        name: null,
        label: null,
        isAuthorized: false
      });
    } else {
      const targetName = currentEvent?.name && currentEvent.name !== 'Subject' ? currentEvent.name : 'Tanvi P G';
      const detected = identifyLiveFace({
        facePresent: true,
        nameHint: targetName
      });
      setCurrentLiveFace(detected);
    }
  };

  // Keyboard shortcut: Spacebar to replay demo scenario instantly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isDemoRunning) {
          runDemoScenario();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoRunning]);

  // Handle Event selection from the left feed
  const handleSelectEvent = (evt) => {
    soundFx.playClick();
    setCurrentEvent(evt);
    setCurrentScore(evt.riskScore);
    setCurrentStatus(evt.status);
    setFacilityStatus(evt.status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setManualSensors({
      weapons: evt.sensors?.weapons?.state === 'red',
      rf: evt.sensors?.rf?.state === 'amber' || evt.sensors?.rf?.state === 'red',
      motion: evt.sensors?.motion?.state === 'amber' || evt.sensors?.motion?.state === 'red',
      network: evt.sensors?.network?.state === 'amber' || evt.sensors?.network?.state === 'red',
    });

    const isAuth = Boolean(evt.faceMatch);
    const objType = evt.sensors?.weapons?.state === 'red' ? 'gun' : 'none';
    setActiveObject(objType);

    const breakdown = calculateRebalancedScore(isAuth, objType, evt.name);
    setFusionBreakdown(breakdown);
  };

  // Live Camera Detection handler from RiskCenter computer vision engine
  const handleLiveCameraDetection = useCallback((result) => {
    if (isDemoRunningRef.current) return;
    if (Date.now() < manualOverrideUntilRef.current) return;
    if (!result) return;

    const {
      frameSeq,
      timestamp,
      isPersonInFrame: personInFrame,
      faceBox,
      isAuthorized,
      displayName,
      matchedPerson,
      detectedObject,
      detectedObjectLabel,
      objectDangerWeight,
      objectConfidence,
      score,
      status,
      fusionBreakdown: breakdown
    } = result;

    setIsFaceInFrame(personInFrame);

    if (personInFrame && matchedPerson) {
      setCurrentLiveFace(matchedPerson);
    } else if (!personInFrame) {
      setCurrentLiveFace({
        facePresent: false,
        activeFace: null,
        inFramePersonnelId: null,
        name: null,
        label: null,
        isAuthorized: false
      });
    }

    setActiveObject(detectedObject);
    setCurrentScore(score);
    setCurrentStatus(status);
    setFacilityStatus(status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setFusionBreakdown(breakdown);

    // If an object is detected as a severe weapon/threat triggering CRITICAL, alert dispatch
    if (status === 'CRITICAL' && objectDangerWeight >= 60) {
      soundFx.playCritical();
      const timeNow = getFormatTime();
      setDispatchLogs(prev => {
        if (prev.length > 0 && prev[0].timestamp === timeNow && prev[0].message.includes(detectedObjectLabel)) {
          return prev;
        }
        return [
          {
            id: `DISP-LIVE-${Date.now()}`,
            timestamp: timeNow,
            type: 'CRITICAL',
            status: 'CRITICAL',
            badge: 'LIVE CAMERA WEAPON ALERT',
            message: `${timeNow} — Police/EMS auto-dispatched (CRITICAL) — Real webcam detected ${detectedObjectLabel} (Danger: +${objectDangerWeight})`,
            zone: "CAM-01 Checkpoint Optical"
          },
          ...prev
        ];
      });
    }

    // Update currentEvent so AI reasoning and JSON telemetry match the real live frame
    setCurrentEvent(prev => ({
      ...prev,
      name: personInFrame ? displayName : 'Perimeter Clear',
      faceMatch: isAuthorized,
      faceConfidence: isAuthorized ? 98.8 : personInFrame ? 34.2 : 0,
      riskScore: score,
      status,
      sensors: {
        ...prev.sensors,
        weapons: {
          state: objectDangerWeight >= 60 ? 'red' : objectDangerWeight > 0 ? 'amber' : 'green',
          label: detectedObjectLabel || detectedObject.toUpperCase()
        }
      },
      reasoning: [
        breakdown.identityLabel,
        breakdown.objectLabel,
        `Total Fusion Score: ${score}/100 → Classification: ${status}`,
        ...(breakdown.reasoningLines ? breakdown.reasoningLines.slice(3) : [])
      ],
      telemetry: {
        ...prev.telemetry,
        frame_seq: frameSeq,
        frame_timestamp: timestamp,
        identity_status: isAuthorized ? 'AUTHORIZED (+0)' : personInFrame ? 'UNAUTHORIZED (+15)' : 'NO_SUBJECT (+0)',
        object_detected: detectedObject,
        object_risk_weight: objectDangerWeight,
        object_confidence_pct: objectConfidence,
        fusion_score: score,
        verdict: status,
        camera_id: 'camera_1',
        inference_engine: 'COCO-SSD MobileNet + Biometric Vector Store'
      }
    }));
  }, []);

  // Rebalanced Fusion State Handler (Identity + Object Danger)
  const handleSelectFusionState = ({ isAuthorized, objectType, subjectName }) => {
    manualOverrideUntilRef.current = Date.now() + 8000;
    soundFx.playClick();
    setIsFaceInFrame(true);

    const objType = objectType !== undefined ? objectType : activeObject;
    setActiveObject(objType);

    const detected = identifyLiveFace({
      facePresent: true,
      nameHint: subjectName || (isAuthorized ? (currentEvent?.name || 'Tanvi P G') : 'Unknown User 1')
    });
    setCurrentLiveFace(detected);

    const nameToUse = detected.name;
    const authStatus = detected.isAuthorized;
    const breakdown = calculateRebalancedScore(authStatus, objType, nameToUse);

    setCurrentScore(breakdown.score);
    setCurrentStatus(breakdown.status);
    setFacilityStatus(breakdown.status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setFusionBreakdown(breakdown);

    if (breakdown.status === 'CRITICAL') {
      soundFx.playCritical();
      setShowEmergencyModal(true);
    } else if (breakdown.status === 'SUSPICIOUS') {
      soundFx.playSuspicious();
    } else {
      soundFx.playNormal();
    }

    const timeNow = getFormatTime();

    // Update currentEvent with explicit reasoning lines
    setCurrentEvent(prev => ({
      ...prev,
      name: nameToUse,
      faceMatch: authStatus,
      faceConfidence: authStatus ? 99.4 : 35.0,
      riskScore: breakdown.score,
      status: breakdown.status,
      sensors: {
        ...prev.sensors,
        weapons: {
          state: objType === 'gun' || objType === 'knife' ? 'red' : objType === 'box_cutter' ? 'amber' : 'green',
          label: objType.toUpperCase()
        }
      },
      reasoning: [
        breakdown.identityLabel,
        breakdown.objectLabel,
        `Total Fusion Score: ${breakdown.score}/100 → Classification: ${breakdown.status}`,
        ...breakdown.reasoningLines.slice(3)
      ],
      telemetry: {
        ...prev.telemetry,
        identity_status: authStatus ? 'AUTHORIZED (+0)' : 'UNAUTHORIZED (+15)',
        object_detected: objType,
        object_risk_weight: breakdown.objectWeight,
        fusion_score: breakdown.score,
        verdict: breakdown.status
      }
    }));

    // Append to dispatch log
    if (breakdown.status === 'CRITICAL') {
      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'CRITICAL',
          status: 'CRITICAL',
          badge: 'AUTO-DISPATCH',
          message: `${timeNow} — Police/EMS auto-dispatched (CRITICAL) — ${breakdown.summary}`,
          zone: currentEvent?.zone || "Gate 1 Alpha"
        },
        ...prev
      ]);
    } else if (breakdown.status === 'SUSPICIOUS') {
      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'SUSPICIOUS',
          status: 'SUSPICIOUS',
          badge: 'GUARD NOTIFIED',
          message: `${timeNow} — Guard notified (SUSPICIOUS) — ${breakdown.summary}`,
          zone: currentEvent?.zone || "Gate 1 Alpha"
        },
        ...prev
      ]);
    } else {
      setFalseAlarmsPrevented(c => c + 1);
      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'SILENT',
          status: 'NORMAL',
          badge: 'PASS',
          message: `${timeNow} — Silently logged (NORMAL) — ${breakdown.summary}`,
          zone: currentEvent?.zone || "Gate 1 Alpha"
        },
        ...prev
      ]);
    }
  };

  // Called when a new face is enrolled through RegisterModal
  const handlePersonnelRegistered = (newPersonnel) => {
    const list = getAuthorizedPersonnel();
    setAuthorizedPersonnel(list);

    setDemoBannerText(`✓ ${newPersonnel.name} registered as authorized (+0 modifier active in live detection loop)`);

    // Immediately recognize this face in the live loop
    handleSelectFusionState({
      isAuthorized: true,
      objectType: activeObject,
      subjectName: newPersonnel.name
    });
  };

  // Recalculate score when manual sensor toggles are clicked
  const handleToggleManualSensor = (sensorKey) => {
    soundFx.playClick();
    const updated = {
      ...manualSensors,
      [sensorKey]: !manualSensors[sensorKey]
    };
    setManualSensors(updated);

    // RF and Network are Not Available hardware sensors and contribute 0 to the fusion score!
    const isAuth = Boolean(currentEvent?.faceMatch);
    const objType = updated.weapons ? 'knife' : 'none';
    const breakdown = calculateRebalancedScore(isAuth, objType, currentEvent?.name || 'Subject');

    setCurrentScore(breakdown.score);
    setCurrentStatus(breakdown.status);
    setFacilityStatus(breakdown.status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setFusionBreakdown(breakdown);

    if (breakdown.status === 'CRITICAL') {
      soundFx.playCritical();
      setShowEmergencyModal(true);
    } else if (breakdown.status === 'SUSPICIOUS') {
      soundFx.playSuspicious();
    } else {
      soundFx.playNormal();
    }
  };

  // Execute the full 3-step Hackathon Demo Scenario (Scripted Walkthrough)
  const runDemoScenario = useCallback(() => {
    clearDemoTimeouts();
    setIsDemoRunning(true);
    soundFx.playClick();

    // SCENARIO 1: Normal Employee Clearance (3.8s duration)
    setDemoBannerText("DEMO STEP 1/3: Normal Employee → All Sensors Clean → Logged Silently (No False Alarm)");
    const step1 = DEMO_SCENARIO_STEPS[0];
    
    const t1_init = setTimeout(() => {
      soundFx.playScan();
      setActiveStage('ingestion');
      setCurrentEvent({
        ...step1.entrant,
        timestamp: getFormatTime(),
        status: 'NORMAL',
        riskScore: 10,
        reasoning: [
          "Face: authorized (Sagarika J.) (+0)",
          "Object: clean sweep (+0)",
          "Total Fusion Score: 10/100 → Classification: NORMAL"
        ],
        telemetry: step1.finalTelemetry,
        sensors: {
          weapons: { state: 'green', label: 'Clear' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        }
      });
      setCurrentScore(10);
      setCurrentStatus('NORMAL');
      setFacilityStatus('NORMAL');
      setFusionBreakdown({
        identityLabel: 'Face: authorized (Sagarika J.) (+0)',
        objectLabel: 'Object: no weapon detected (+0)',
        score: 10,
        status: 'NORMAL',
        summary: 'Face: authorized (Sagarika J.) (+0) then Object: clean (+0) → NORMAL, total 10.'
      });
    }, 200);

    const t1_fusion = setTimeout(() => {
      setActiveStage('fusion');
      setCurrentScore(12);
      setCurrentEvent(prev => ({
        ...prev,
        reasoning: [...prev.reasoning, step1.timeline[1].reasoningLine]
      }));
    }, 1400);

    const t1_corr = setTimeout(() => {
      setActiveStage('correlation');
      setCurrentEvent(prev => ({
        ...prev,
        reasoning: [...prev.reasoning, step1.timeline[2].reasoningLine]
      }));
    }, 2400);

    const t1_dispatch = setTimeout(() => {
      soundFx.playNormal();
      setActiveStage('dispatch');
      setFalseAlarmsPrevented(count => count + 1);
      const newEvt = {
        id: step1.entrant.id,
        name: step1.entrant.name,
        empId: step1.entrant.empId,
        timestamp: getFormatTime(),
        zone: step1.entrant.zone,
        faceMatch: true,
        faceConfidence: 99.4,
        status: 'NORMAL',
        riskScore: 12,
        photo: step1.entrant.photo,
        sensors: {
          weapons: { state: 'green', label: 'Clear' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: step1.timeline.map(t => t.reasoningLine),
        telemetry: step1.finalTelemetry
      };
      setEvents(prev => [newEvt, ...prev]);

      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: getFormatTime(),
          type: 'SILENT',
          status: 'NORMAL',
          badge: 'PASS',
          message: `${getFormatTime()} — Silently logged (NORMAL) — Turnstile Alpha opened`,
          zone: step1.entrant.zone
        },
        ...prev
      ]);
    }, 3500);

    // SCENARIO 2: Authorized Staff with Exposed Weapon / Blade (Starts at 4.6s)
    const step2 = DEMO_SCENARIO_STEPS[1];
    const t2_start = setTimeout(() => {
      setDemoBannerText("DEMO STEP 2/3: Authorized Staff → Face Verified (+0), but Exposed Knife Detected (+60) → SUSPICIOUS");
      soundFx.playScan();
      setActiveStage('ingestion');
      setCurrentEvent({
        ...step2.entrant,
        timestamp: getFormatTime(),
        status: 'NORMAL',
        riskScore: 15,
        reasoning: [
          "Face: authorized (Sanidhya) (+0)",
          "Object: clean (+0)",
          "Total Fusion Score: 15/100 → Classification: NORMAL"
        ],
        telemetry: step2.finalTelemetry,
        sensors: {
          weapons: { state: 'green', label: 'Clear' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        }
      });
      setCurrentScore(15);
      setCurrentStatus('NORMAL');
    }, 4600);

    const t2_fusion = setTimeout(() => {
      soundFx.playSuspicious();
      setActiveStage('fusion');
      setCurrentScore(60);
      setCurrentStatus('SUSPICIOUS');
      setFacilityStatus('SUSPICIOUS');
      setCurrentEvent(prev => ({
        ...prev,
        riskScore: 60,
        status: 'SUSPICIOUS',
        sensors: {
          weapons: { state: 'red', label: 'Knife (+60)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: [...prev.reasoning, step2.timeline[1].reasoningLine]
      }));
    }, 6200);

    const t2_corr = setTimeout(() => {
      setActiveStage('correlation');
      setCurrentScore(60);
      setCurrentEvent(prev => ({
        ...prev,
        riskScore: 60,
        sensors: {
          weapons: { state: 'red', label: 'Knife (+60)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: [
          "Face: authorized (Sanidhya) (+0)",
          "Object: knife, blade exposed (+60)",
          "Total Fusion Score: 60/100 → Classification: SUSPICIOUS",
          "OBJECT DANGER PRIORITY: Authorized face overridden by severe object danger (60) → SUSPICIOUS"
        ]
      }));
      setFusionBreakdown({
        identityLabel: 'Face: authorized (Sanidhya) (+0)',
        objectLabel: 'Object: knife, blade exposed (+60)',
        score: 60,
        status: 'SUSPICIOUS',
        summary: 'Face: authorized (Sanidhya) (+0) then Object: knife (+60) → SUSPICIOUS, total 60.'
      });
    }, 7600);

    const t2_dispatch = setTimeout(() => {
      soundFx.playSuspicious();
      setActiveStage('dispatch');
      const timeNow = getFormatTime();
      const newEvt = {
        id: step2.entrant.id,
        name: step2.entrant.name,
        empId: step2.entrant.empId,
        timestamp: timeNow,
        zone: step2.entrant.zone,
        faceMatch: true,
        faceConfidence: 99.1,
        status: 'SUSPICIOUS',
        riskScore: 60,
        photo: step2.entrant.photo,
        sensors: {
          weapons: { state: 'red', label: 'Knife (+60)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: step2.timeline.map(t => t.reasoningLine),
        telemetry: step2.finalTelemetry
      };
      setEvents(prev => [newEvt, ...prev]);

      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'SUSPICIOUS',
          status: 'SUSPICIOUS',
          badge: 'GUARD ALERT',
          message: `${timeNow} — Guard notified (SUSPICIOUS) — Wand inspect authorized visitor carrying exposed blade at Gate 2`,
          zone: step2.entrant.zone
        },
        ...prev
      ]);
    }, 8900);

    // SCENARIO 3: Face Mismatch + Firearm Detected → Score 95 CRITICAL (Starts at 10.2s)
    const step3 = DEMO_SCENARIO_STEPS[2];
    const t3_start = setTimeout(() => {
      setDemoBannerText("DEMO STEP 3/3: Unidentified Subject (+15) + Concealed Firearm (+90) → CRITICAL AUTO-DISPATCH (95)");
      soundFx.playScan();
      setActiveStage('ingestion');
      setCurrentEvent({
        ...step3.entrant,
        timestamp: getFormatTime(),
        status: 'SUSPICIOUS',
        riskScore: 15,
        reasoning: [step3.timeline[0].reasoningLine],
        telemetry: step3.finalTelemetry,
        sensors: {
          weapons: { state: 'green', label: 'Clear' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        }
      });
      setCurrentScore(15);
      setCurrentStatus('SUSPICIOUS');
    }, 10200);

    const t3_fusion = setTimeout(() => {
      soundFx.playCritical();
      setActiveStage('fusion');
      setCurrentScore(95);
      setCurrentStatus('CRITICAL');
      setFacilityStatus('CRITICAL');
      setCurrentEvent(prev => ({
        ...prev,
        riskScore: 95,
        status: 'CRITICAL',
        sensors: {
          weapons: { state: 'red', label: 'Firearm Alert (+90)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: [...prev.reasoning, step3.timeline[1].reasoningLine]
      }));
    }, 11800);

    const t3_corr = setTimeout(() => {
      setActiveStage('correlation');
      setCurrentScore(95);
      setCurrentStatus('CRITICAL');
      setFacilityStatus('CRITICAL');
      setCurrentEvent(prev => ({
        ...prev,
        riskScore: 95,
        status: 'CRITICAL',
        sensors: {
          weapons: { state: 'red', label: 'Firearm Alert (+90)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: [
          "Face: unauthorized/unrecognized (+15)",
          "Object: gun, concealed firearm (+90)",
          "Total Fusion Score: 95/100 → Classification: CRITICAL",
          "Escalated to CRITICAL: Auto-lockdown engaged. Emergency Police/EMS auto-dispatched."
        ]
      }));
      setFusionBreakdown({
        identityLabel: 'Face: unauthorized/unrecognized (+15)',
        objectLabel: 'Object: firearm / gun (+90)',
        score: 95,
        status: 'CRITICAL',
        summary: 'Face: unauthorized/unrecognized (+15) then Object: firearm (+90) → CRITICAL, total 95.'
      });
    }, 13200);

    const t3_dispatch = setTimeout(() => {
      soundFx.playCritical();
      setActiveStage('dispatch');
      const timeNow = getFormatTime();
      const newEvt = {
        id: step3.entrant.id,
        name: step3.entrant.name,
        empId: step3.entrant.empId,
        timestamp: timeNow,
        zone: step3.entrant.zone,
        faceMatch: false,
        faceConfidence: 34.1,
        status: 'CRITICAL',
        riskScore: 95,
        photo: step3.entrant.photo,
        sensors: {
          weapons: { state: 'red', label: 'Firearm Alert (+90)' },
          rf: { state: 'disabled', label: 'Not Available' },
          motion: { state: 'disabled', label: 'Not Available' },
          network: { state: 'disabled', label: 'Not Available' }
        },
        reasoning: step3.timeline.map(t => t.reasoningLine),
        telemetry: step3.finalTelemetry
      };
      setEvents(prev => [newEvt, ...prev]);

      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'CRITICAL',
          status: 'CRITICAL',
          badge: 'EMERGENCY CAD',
          message: `${timeNow} — Police/EMS auto-dispatched (CRITICAL) — Turnstiles locked & Armed Unit routed`,
          zone: step3.entrant.zone
        },
        ...prev
      ]);

      setShowEmergencyModal(true);
      setIsDemoRunning(false);
      setDemoBannerText("DEMO COMPLETED: Verified Normal (12), Suspicious (60), and Critical Auto-Dispatch (95).");
    }, 14800);

    demoTimeoutsRef.current = [
      t1_init, t1_fusion, t1_corr, t1_dispatch,
      t2_start, t2_fusion, t2_corr, t2_dispatch,
      t3_start, t3_fusion, t3_corr, t3_dispatch
    ];
  }, []);

  // Reset dashboard state
  const handleReset = () => {
    clearDemoTimeouts();
    setIsDemoRunning(false);
    setDemoBannerText(null);
    setCurrentEvent(INITIAL_EVENTS[0]);
    setCurrentScore(12);
    setCurrentStatus('NORMAL');
    setFacilityStatus('NORMAL');
    setActiveStage(null);
    setShowEmergencyModal(false);
    setActiveObject('none');
    setManualSensors({ weapons: false, rf: false, motion: false, network: false });
    setFusionBreakdown({
      identityLabel: 'Face: authorized (Dr. Krupanjali B.) (+0)',
      objectLabel: 'Object: no weapon detected (+0)',
      score: 12,
      status: 'NORMAL',
      summary: 'Face: authorized (Dr. Krupanjali B.) (+0) then Object: clean (+0) → NORMAL, total 12.'
    });
  };

  // Apply scenario from Insider Threat Modal
  const handleApplyInsiderScenario = (scenarioData) => {
    clearDemoTimeouts();
    setIsDemoRunning(false);
    const timeNow = getFormatTime();

    const newEvt = {
      id: `EVT-INSIDER-${Date.now().toString().slice(-4)}`,
      name: scenarioData.entrant.name,
      empId: scenarioData.entrant.id,
      timestamp: timeNow,
      zone: "Gate 1 - North Executive",
      faceMatch: scenarioData.faceMatch,
      faceConfidence: scenarioData.faceConfidence,
      status: scenarioData.status,
      riskScore: scenarioData.riskScore,
      photo: scenarioData.entrant.avatar,
      sensors: {
        weapons: { state: scenarioData.sensorStates.weapons, label: scenarioData.sensorStates.weapons === 'red' ? 'Concealed Metal' : 'Clear' },
        rf: { state: scenarioData.sensorStates.rf, label: scenarioData.sensorStates.rf === 'red' ? 'Covert Jammer' : 'Nominal' },
        motion: { state: scenarioData.sensorStates.motion, label: 'Verified Gait' },
        network: { state: scenarioData.sensorStates.network, label: 'Corporate 802.1X' }
      },
      reasoning: scenarioData.reasoning,
      telemetry: scenarioData.telemetry
    };

    setCurrentEvent(newEvt);
    setCurrentScore(scenarioData.riskScore);
    setCurrentStatus(scenarioData.status);
    setFacilityStatus(scenarioData.status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setEvents(prev => [newEvt, ...prev]);

    if (scenarioData.status === 'CRITICAL') {
      soundFx.playCritical();
      setDispatchLogs(prev => [
        {
          id: `DISP-${Date.now()}`,
          timestamp: timeNow,
          type: 'CRITICAL',
          status: 'CRITICAL',
          badge: 'INSIDER THREAT',
          message: `${timeNow} — Police/EMS auto-dispatched (CRITICAL) — Flagged: Authorized ID + Covert RF Wave Signature`,
          zone: "Gate 1 - North Executive"
        },
        ...prev
      ]);
      setShowEmergencyModal(true);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col font-sans relative selection:bg-[#c9a24b] selection:text-black ${
      facilityStatus === 'CRITICAL' ? 'critical-glow' : ''
    }`}>
      {/* Background ambient cyber grid */}
      <div className="fixed inset-0 cyber-grid opacity-30 pointer-events-none"></div>

      {/* Screen-wide pulsing red alert border when in CRITICAL state */}
      {facilityStatus === 'CRITICAL' && (
        <div className="fixed inset-0 pointer-events-none border-4 border-red-600/80 animate-pulse-critical z-40"></div>
      )}

      {/* Top Header */}
      <Header
        facilityStatus={facilityStatus}
        falseAlarmsPrevented={falseAlarmsPrevented}
        isDemoRunning={isDemoRunning}
        onRunDemo={runDemoScenario}
        onResetDemo={handleReset}
        onTriggerInsiderThreat={() => setShowInsiderThreatModal(true)}
        onOpenRegister={() => setShowRegisterModal(true)}
        showArchitecture={showArchitecture}
        setShowArchitecture={setShowArchitecture}
        useWebcam={useWebcam}
        setUseWebcam={setUseWebcam}
        activeStage={activeStage}
      />

      {/* Active Demo / Notification Banner */}
      {demoBannerText && (
        <div className="bg-gradient-to-r from-amber-950/80 via-purple-950/70 to-red-950/80 border-b border-[#c9a24b]/40 px-4 py-2 font-mono text-xs text-amber-200 flex items-center justify-between z-20 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c9a24b] animate-ping"></span>
            <span className="font-bold">{demoBannerText}</span>
          </div>
          <button
            onClick={() => setDemoBannerText(null)}
            className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-black/40"
          >
            Dismiss [✕]
          </button>
        </div>
      )}

      {/* Collapsible Architecture Diagram Panel */}
      <ArchitectureDiagram
        activeStage={activeStage}
        isOpen={showArchitecture}
        onClose={() => setShowArchitecture(false)}
      />

      {/* Main 3-Column Control Room Grid */}
      <main className="flex-1 p-3 lg:p-4 max-w-[1920px] w-full mx-auto flex flex-col gap-3 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
          {/* LEFT PANEL: Live Personnel Roster + Live Event Feed (3 Cols) */}
          <section className="lg:col-span-3 flex flex-col gap-3 min-h-[460px] lg:min-h-0">
            <PersonnelRoster
              authorizedPersonnel={authorizedPersonnel}
              currentDetectedFace={isFaceInFrame ? currentLiveFace : { facePresent: false }}
              activeCameraId={activeCameraId}
            />
            <div className="flex-1 min-h-[300px] flex flex-col">
              <EventFeed
                events={events}
                selectedEventId={currentEvent?.id}
                onSelectEvent={handleSelectEvent}
              />
            </div>
          </section>

          {/* CENTER PANEL: Risk Score Gauge + Camera HUD + Rebalanced Fusion Controls (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col min-h-[520px] lg:min-h-0">
            <RiskCenter
              currentEvent={currentEvent}
              currentScore={currentScore}
              currentStatus={currentStatus}
              useWebcam={useWebcam}
              setUseWebcam={setUseWebcam}
              manualSensors={manualSensors}
              onToggleManualSensor={handleToggleManualSensor}
              isDemoRunning={isDemoRunning}
              authorizedPersonnel={authorizedPersonnel}
              activeObject={activeObject}
              onSelectFusionState={handleSelectFusionState}
              activeCameraId={activeCameraId}
              onSelectCamera={setActiveCameraId}
              onOpenPhoneModal={() => setShowPhoneModal(true)}
              isFaceInFrame={isFaceInFrame}
              onToggleFaceInFrame={handleToggleFaceInFrame}
              currentLiveFace={currentLiveFace}
              onLiveDetection={handleLiveCameraDetection}
            />
          </section>

          {/* RIGHT PANEL: Explainable AI Reasoning Log + Raw JSON Feed (4 Cols) */}
          <section className="lg:col-span-4 flex flex-col min-h-[460px] lg:min-h-0">
            <AIReasoningLog
              reasoningLines={currentEvent?.reasoning || []}
              telemetryData={currentEvent?.telemetry || {}}
              status={currentStatus}
              fusionBreakdown={fusionBreakdown}
            />
          </section>
        </div>

        {/* BOTTOM PANEL: Timestamped Tiered Emergency & Guard Dispatch Log */}
        <section className="w-full">
          <DispatchLog
            dispatchLogs={dispatchLogs}
            onOpenCriticalModal={() => setShowEmergencyModal(true)}
          />
        </section>
      </main>

      {/* Modals */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        currentEvent={currentEvent}
        riskScore={currentScore}
      />

      <InsiderThreatModal
        isOpen={showInsiderThreatModal}
        onClose={() => setShowInsiderThreatModal(false)}
        onApplyScenario={handleApplyInsiderScenario}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onPersonnelRegistered={handlePersonnelRegistered}
      />

      <PhoneCameraModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        localIp={localIp}
      />
    </div>
  );
}
