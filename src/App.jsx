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
import KnifeAlertModal from './components/KnifeAlertModal';
import { 
  INITIAL_EVENTS, 
  INITIAL_DISPATCH_LOG, 
  DEMO_SCENARIO_STEPS, 
  TEAM_MEMBERS 
} from './data/mockData';
import { soundFx } from './utils/audio';
import { 
  getAuthorizedPersonnel, 
  calculateRebalancedScore, 
  deleteAuthorizedPersonnel, 
  resetAuthorizedPersonnelToDefaults 
} from './utils/personnelStore';
import { dispatchTwilioAuthorityCall, HIGHER_AUTHORITY_PHONE } from './utils/twilioService';
import { identifyLiveFace } from './utils/faceTracker';

const STANDBY_EVENT = {
  id: "EVT-STANDBY",
  timestamp: "12:00:00",
  name: "Perimeter Clear (No Face Detected)",
  empId: "OPT-OPTICAL",
  zone: "Gate 1 - Checkpoint Optical",
  faceMatch: false,
  faceConfidence: 0,
  faceCount: 0,
  status: "NORMAL",
  riskScore: 0,
  sensors: {
    weapons: { state: "green", label: "Clear", detail: "Optical scan clean (+0)" },
    rf: { state: "disabled", label: "Not Available", detail: "Requires SDR hardware" },
    motion: { state: "disabled", label: "Not Available", detail: "Perimeter Standby" },
    network: { state: "disabled", label: "Not Available", detail: "Requires network access integration" }
  },
  reasoning: [
    "Google MediaPipe Tasks Vision Face Detector active in VIDEO mode.",
    "Perimeter optical scan active. No faces detected in live camera feed.",
    "Awaiting entrant ingress. System standing by."
  ],
  telemetry: {
    face_count: 0,
    model: "Google MediaPipe Tasks Vision Face Detector",
    status: "STANDBY"
  }
};

export default function App() {
  // Main states
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [currentEvent, setCurrentEvent] = useState(STANDBY_EVENT);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('NORMAL');
  const [facilityStatus, setFacilityStatus] = useState('NORMAL');
  const [falseAlarmsPrevented, setFalseAlarmsPrevented] = useState(142);
  const [dispatchLogs, setDispatchLogs] = useState(INITIAL_DISPATCH_LOG);

  // Authorized personnel list
  const [authorizedPersonnel, setAuthorizedPersonnel] = useState(getAuthorizedPersonnel());

  // Rebalanced fusion states
  const [activeObject, setActiveObject] = useState('none');
  const [fusionBreakdown, setFusionBreakdown] = useState({
    identityLabel: 'Face: scanning perimeter',
    objectLabel: 'Object: no weapon detected (+0)',
    score: 0,
    status: 'NORMAL',
    summary: 'Perimeter clear. MediaPipe Face Detector active.'
  });

  // Live Face Detection & In-Frame Tracking (WS & Local)
  const [isFaceInFrame, setIsFaceInFrame] = useState(false);
  const [currentLiveFace, setCurrentLiveFace] = useState(null);
  const [inFrameIds, setInFrameIds] = useState([]);
  const [knifeHolderId, setKnifeHolderId] = useState(null);
  const [activeCameraId, setActiveCameraId] = useState('camera_1');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [localIp, setLocalIp] = useState('localhost');

  // Architecture & Audio & HUD states
  const [activeStage, setActiveStage] = useState(null);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [useWebcam, setUseWebcam] = useState(true);

  // Synchronized refs to prevent stale closures and isolate demo mode
  const isDemoRunningRef = useRef(false);
  const useWebcamRef = useRef(true);
  const activeCameraIdRef = useRef(activeCameraId);
  const manualOverrideUntilRef = useRef(0);
  const lastFaceEventTimeRef = useRef(0);
  const prevFaceCountRef = useRef(0);
  const prevDetectedObjectRef = useRef('none');
  const lastKnifeAlertTimeRef = useRef(0);

  // Modals
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showKnifeModal, setShowKnifeModal] = useState(false);
  const [knifeModalData, setKnifeModalData] = useState(null);
  const [showInsiderThreatModal, setShowInsiderThreatModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Widget visibility toggles (Touch to open / minimize)
  const [showRosterWidget, setShowRosterWidget] = useState(true);
  const [showReasoningWidget, setShowReasoningWidget] = useState(true);
  const [showDispatchWidget, setShowDispatchWidget] = useState(true);

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
      setInFrameIds([]);
      setKnifeHolderId(null);
      setCurrentLiveFace({
        facePresent: false,
        activeFace: null,
        inFramePersonnelId: null,
        inFrameIds: [],
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
      const ids = [authorizedPersonnel[0]?.id || 'AUTH-001'];
      setInFrameIds(ids);
      setCurrentLiveFace({
        ...detected,
        inFrameIds: ids,
        inFramePersonnelId: ids[0]
      });
    }
  };

  // Keyboard shortcut: Spacebar to replay demo scenario instantly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (!useWebcam && !isDemoRunning) {
          runDemoScenario();
        }
      }
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        handleToggleManualSensor('weapons');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoRunning, useWebcam]);

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
    if (!result) return;
    if (manualOverrideUntilRef.current > Date.now()) return;

    const {
      frameSeq,
      timestamp,
      isPersonInFrame: personInFrame,
      faceCount = 0,
      primaryConfidence = 0,
      faceBox,
      displayName,
      detectedObject,
      detectedObjectLabel,
      objectDangerWeight,
      objectConfidence,
      score,
      status,
      reasoningLines
    } = result;

    setIsFaceInFrame(personInFrame);

    const activeInFrameIds = [];
    if (personInFrame && faceCount > 0) {
      for (let i = 0; i < Math.min(faceCount, authorizedPersonnel.length); i++) {
        activeInFrameIds.push(authorizedPersonnel[i].id);
      }
    }
    setInFrameIds(activeInFrameIds);

    const isKnife = (detectedObject === 'knife') || (result.weaponPredictions && result.weaponPredictions.length > 0);
    const knifeHolderIdx = result.knifeHolderIdx !== undefined ? result.knifeHolderIdx : 0;
    const knifeHolderPerson = (authorizedPersonnel && authorizedPersonnel[knifeHolderIdx])
      ? authorizedPersonnel[knifeHolderIdx]
      : (authorizedPersonnel && authorizedPersonnel[0]);
    const knifeHolderPersonName = knifeHolderPerson ? knifeHolderPerson.name : 'Tanvi P G';
    const activeKnifeHolderId = isKnife ? (knifeHolderPerson ? knifeHolderPerson.id : 'AUTH-001') : null;
    setKnifeHolderId(activeKnifeHolderId);

    const primaryPerson = (authorizedPersonnel && authorizedPersonnel.length > 0) ? authorizedPersonnel[0] : null;
    const secondaryPerson = (authorizedPersonnel && authorizedPersonnel.length > 1) ? authorizedPersonnel[1] : null;
    const personName = primaryPerson ? primaryPerson.name : 'Tanvi P G';
    const personId = primaryPerson ? primaryPerson.id : 'AUTH-001';

    if (personInFrame) {
      setCurrentLiveFace({
        facePresent: true,
        name: faceCount >= 2 ? `${personName} & ${secondaryPerson?.name || 'Sanidhya'}` : personName,
        label: faceCount >= 2 ? `2 AUTHORIZED PERSONNEL IN FRAME` : `${personName} (AUTHORIZED)`,
        inFramePersonnelId: personId,
        inFrameIds: activeInFrameIds,
        faceCount,
        isKnifeDetected: isKnife,
        knifeHolderId: activeKnifeHolderId,
        isAuthorized: true
      });
    } else {
      setCurrentLiveFace({
        facePresent: false,
        name: null,
        label: null,
        inFramePersonnelId: null,
        inFrameIds: [],
        faceCount: 0,
        isKnifeDetected: false,
        knifeHolderId: null,
        isAuthorized: false
      });
    }

    setActiveObject(isKnife ? 'knife' : 'none');
    setCurrentScore(score);
    setCurrentStatus(status);
    setFacilityStatus(status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');

    setFusionBreakdown({
      identityLabel: personInFrame 
        ? (faceCount >= 2 ? `${personName} & ${secondaryPerson?.name || 'Sanidhya'} (In Frame) (+0)` : `${personName} (In Frame) (+0)`)
        : 'Perimeter sweep clear',
      objectLabel: isKnife ? `⚠️ ${result.detectedObjectLabel || 'KNIFE VISIBLE'} (${objectConfidence}%)` : 'Clean / No knife detected',
      score,
      status,
      summary: isKnife 
        ? `⚠️ CRITICAL: ${result.detectedObjectLabel || 'KNIFE VISIBLE'} IN FEED! Person armed: ${knifeHolderPersonName} (${objectConfidence}% confidence). Threat score escalated to ${score}/100.` 
        : (personInFrame ? `${personName} ${faceCount >= 2 ? `and ${secondaryPerson?.name || 'Sanidhya'}` : ''} active in optical feed. Perimeter normal.` : 'No faces or knives detected.')
    });

    const timeNow = getFormatTime();

    // 1. REAL KNIFE DETECTION THREAT ALERT (AUTOMATIC ON WEBCAM FEED)
    if (isKnife) {
      const knifeJustAppeared = prevDetectedObjectRef.current !== 'knife';
      const cooldownElapsed = Date.now() - lastKnifeAlertTimeRef.current > 3500;

      if (knifeJustAppeared || cooldownElapsed) {
        lastKnifeAlertTimeRef.current = Date.now();
        prevDetectedObjectRef.current = 'knife';

        // Whenever the red box shows on screen (knife detected), automatically play the 3-second alarm clock sound!
        soundFx.playAlarmClock(3.0);

        const knifeEvent = {
          id: `EVT-KNIFE-${Date.now().toString().slice(-4)}`,
          timestamp: timeNow,
          name: `${knifeHolderPersonName} — ARMED WITH KNIFE`,
          empId: 'OPT-KNIFE',
          zone: 'Gate 1 - Checkpoint Optical',
          faceMatch: personInFrame,
          faceConfidence: Math.round(primaryConfidence * 100),
          faceCount,
          status: 'CRITICAL',
          riskScore: score,
          sensors: {
            weapons: {
              state: 'red',
              label: `KNIFE VISIBLE (${objectConfidence}%)`
            },
            rf: { state: 'disabled', label: 'Not Available' },
            motion: { state: personInFrame ? 'green' : 'disabled', label: personInFrame ? `${faceCount} Face(s) Verified` : 'Standby' },
            network: { state: 'disabled', label: 'Not Available' }
          },
          reasoning: reasoningLines || [
            `MediaPipe Face Detector: Real entrant verified in camera feed (${Math.round(primaryConfidence * 100)}% conf).`,
            `Physical Safety Screening: Exposed KNIFE VISIBLE in hands (${objectConfidence}% confidence) — Exposure danger!`,
            `Threat Escalation: Zero-Trust score increased to ${score}/100 (CRITICAL). Tactical lockdown protocol engaged.`,
            `Twilio Voice Dispatch: Automated emergency call placed to Higher Authority (${HIGHER_AUTHORITY_PHONE}).`
          ],
          telemetry: {
            knife_detected: true,
            person_holding: knifeHolderPersonName,
            confidence: objectConfidence,
            model: 'TensorFlow.js COCO-SSD (Knife & Blade Screening)',
            threat_level: `CRITICAL (${score}/100)`,
            action: 'AUTO_DISPATCH_TRIGGERED',
            twilio_authority_call: `Dispatched to ${HIGHER_AUTHORITY_PHONE}`
          }
        };

        // Dispatch live Twilio voice call to Higher Authority
        dispatchTwilioAuthorityCall({
          reason: `Real Knife Detected in Feed (${objectConfidence}% conf)`,
          threatScore: score,
          subjectName: knifeHolderPersonName
        });

        setEvents(prev => [knifeEvent, ...prev.slice(0, 19)]);
        setCurrentEvent(knifeEvent);

        setDispatchLogs(prev => [
          {
            id: `DISP-TWILIO-${Date.now()}`,
            timestamp: timeNow,
            type: 'CRITICAL',
            status: 'CRITICAL',
            badge: 'TWILIO CALL',
            message: `${timeNow} — 📞 EMERGENCY VOICE CALL INITIATED to Higher Authority (${HIGHER_AUTHORITY_PHONE}) via Twilio! Subject armed: ${knifeHolderPersonName}.`,
            zone: 'Gate 1 - Checkpoint Optical'
          },
          {
            id: `DISP-${Date.now()}`,
            timestamp: timeNow,
            type: 'CRITICAL',
            status: 'CRITICAL',
            badge: 'KNIFE VISIBLE',
            message: `${timeNow} — Checkpoint Optical: Real KNIFE VISIBLE in camera feed (${objectConfidence}% conf) in hands of ${knifeHolderPersonName}. Tactical lockdown engaged!`,
            zone: 'Gate 1 - Checkpoint Optical'
          },
          ...prev.slice(0, 18)
        ]);

        setKnifeModalData({
          personName: knifeHolderPersonName,
          threatScore: 95,
          personPhoto: knifeHolderPerson?.photo || null,
          zone: 'Gate 1 - Checkpoint Optical',
          confidence: objectConfidence || 95,
          isPenWeapon: Boolean(result.isPenWeapon)
        });
        setShowKnifeModal(true);
      }
    } else {
      if (prevDetectedObjectRef.current === 'knife') {
        prevDetectedObjectRef.current = 'none';
      }

      // 2. Normal face presence event tracking (when no knife is present)
      if (personInFrame && faceCount > 0) {
        const enteredFrame = prevFaceCountRef.current === 0;
        const countChanged = faceCount !== prevFaceCountRef.current;
        const cooldownElapsed = Date.now() - lastFaceEventTimeRef.current > 10000;

        if (enteredFrame || countChanged || cooldownElapsed) {
          lastFaceEventTimeRef.current = Date.now();
          prevFaceCountRef.current = faceCount;

          const newEvt = {
            id: `EVT-${Date.now().toString().slice(-4)}`,
            timestamp: timeNow,
            name: `${activePersonName} (In Frame)`,
            empId: 'OPT-OPTICAL',
            zone: 'Gate 1 - Checkpoint Optical',
            faceMatch: true,
            faceConfidence: Math.round(primaryConfidence * 100),
            faceCount,
            status: 'NORMAL',
            riskScore: score,
            sensors: {
              weapons: {
                state: 'green',
                label: 'Clean / No Knife'
              },
              rf: { state: 'disabled', label: 'Not Available' },
              motion: { state: 'green', label: `${faceCount} Face(s) Verified` },
              network: { state: 'disabled', label: 'Not Available' }
            },
            reasoning: reasoningLines || [
              `MediaPipe Face Detector: ${faceCount} face(s) verified in live video feed.`,
              `Detection confidence: ${Math.round(primaryConfidence * 100)}%.`,
              `Perimeter security status: NORMAL (${score}/100). No physical weapons present.`
            ],
            telemetry: {
              face_count: faceCount,
              person: activePersonName,
              confidence: primaryConfidence,
              model: 'Google MediaPipe Tasks Vision Face Detector',
              status: 'FACE_DETECTED'
            }
          };

          setEvents(prev => [newEvt, ...prev.slice(0, 19)]);
          setCurrentEvent(newEvt);

          setDispatchLogs(prev => [
            {
              id: `DISP-${Date.now()}`,
              timestamp: timeNow,
              type: 'NORMAL',
              status: 'NORMAL',
              badge: faceCount > 1 ? `${faceCount} FACES` : 'FACE DETECTED',
              message: `${timeNow} — Checkpoint Optical: ${faceCount === 1 ? '1 Face' : `${faceCount} Faces`} detected in frame (${Math.round(primaryConfidence * 100)}% conf).`,
              zone: 'Gate 1 - Checkpoint Optical'
            },
            ...prev.slice(0, 19)
          ]);
        }
      } else {
        prevFaceCountRef.current = 0;
        setCurrentEvent(prev => ({
          ...prev,
          name: 'Perimeter Clear (No Face Detected)',
          faceMatch: false,
          faceConfidence: 0,
          faceCount: 0,
          riskScore: 0,
          status: 'NORMAL',
          reasoning: [
            'Google MediaPipe Face Detector active in VIDEO mode.',
            'Perimeter optical sweep clean. No face detected.',
            'Status: NORMAL (0/100).'
          ]
        }));
      }
    }
  }, []);

  // Rebalanced Fusion State Handler (Identity + Object Danger)
  const handleSelectFusionState = ({ isAuthorized, objectType, subjectName, multiPerson = false }) => {
    soundFx.playClick();
    setIsFaceInFrame(true);

    const objType = useWebcam ? activeObject : (objectType !== undefined ? objectType : activeObject);
    setActiveObject(objType);

    if (multiPerson || subjectName?.includes('&')) {
      const ids = [authorizedPersonnel[0]?.id || 'AUTH-001', authorizedPersonnel[1]?.id || 'AUTH-002'];
      setInFrameIds(ids);
      const isKnife = objType === 'knife' || manualSensors.weapons;
      if (isKnife) setKnifeHolderId(ids[0]);

      setCurrentLiveFace({
        facePresent: true,
        name: 'Tanvi P G & Sanidhya',
        label: '2 AUTHORIZED PERSONNEL IN FRAME',
        inFramePersonnelId: ids[0],
        inFrameIds: ids,
        faceCount: 2,
        isAuthorized: true,
        isKnifeDetected: isKnife
      });

      const score = isKnife ? 95 : 12;
      const status = isKnife ? 'CRITICAL' : 'NORMAL';
      setCurrentScore(score);
      setCurrentStatus(status);
      setFacilityStatus(status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
      setFusionBreakdown({
        identityLabel: 'Tanvi P G & Sanidhya (In Frame) (+0)',
        objectLabel: isKnife ? '⚠️ KNIFE VISIBLE (+80)' : 'Object: clean (+0)',
        score,
        status,
        summary: isKnife ? '⚠️ CRITICAL: KNIFE VISIBLE IN FEED! Person armed: Tanvi P G. Threat score escalated to 95/100.' : 'Two authorized personnel active in optical feed. Perimeter normal.'
      });
      return;
    }

    const detected = identifyLiveFace({
      facePresent: true,
      nameHint: subjectName || (isAuthorized ? (currentEvent?.name || 'Tanvi P G') : 'Unknown User 1')
    });

    const match = authorizedPersonnel.find(p => p.name.toLowerCase() === (detected.name || '').toLowerCase());
    const ids = match ? [match.id] : [];
    setInFrameIds(ids);
    const isKnife = objType === 'knife' || manualSensors.weapons;
    if (isKnife) setKnifeHolderId(ids[0] || null);

    setCurrentLiveFace({
      ...detected,
      inFrameIds: ids,
      inFramePersonnelId: ids[0] || null,
      faceCount: 1,
      isKnifeDetected: isKnife
    });

    const nameToUse = detected.name;
    const authStatus = detected.isAuthorized;
    const breakdown = calculateRebalancedScore(authStatus, objType, nameToUse);

    setCurrentScore(isKnife ? 95 : breakdown.score);
    setCurrentStatus(isKnife ? 'CRITICAL' : breakdown.status);
    setFacilityStatus(isKnife || breakdown.status === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
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

  // Called when a person is deleted from the roster
  const handleDeletePersonnel = (personId) => {
    soundFx.playAlert();
    const updated = deleteAuthorizedPersonnel(personId);
    setAuthorizedPersonnel(updated);

    // If the person deleted was currently active in frame, revoke access
    if (inFrameIds.includes(personId) || currentLiveFace?.inFramePersonnelId === personId) {
      setInFrameIds(prev => prev.filter(id => id !== personId));
      setCurrentLiveFace(prev => ({
        ...prev,
        isAuthorized: false,
        name: 'Unauthorized User (Access Revoked)',
        label: 'REVOKED / UNRECOGNIZED BIOMETRIC'
      }));
      const isKnife = activeObject === 'knife' || manualSensors.weapons;
      const score = isKnife ? 95 : 15;
      const status = isKnife ? 'CRITICAL' : 'SUSPICIOUS';
      setCurrentScore(score);
      setCurrentStatus(status);
    }
  };

  const handleResetPersonnel = () => {
    soundFx.playClick();
    const restored = resetAuthorizedPersonnelToDefaults();
    setAuthorizedPersonnel(restored);
  };

  // Recalculate score when manual sensor toggles are clicked
  const handleToggleManualSensor = (sensorKey) => {
    manualOverrideUntilRef.current = Date.now() + 8000;
    soundFx.playClick();
    const updated = {
      ...manualSensors,
      [sensorKey]: !manualSensors[sensorKey]
    };
    setManualSensors(updated);

    const isHoldingKnife = updated.weapons || activeObject === 'knife';
    const inFramePerson = (inFrameIds.length > 0 && authorizedPersonnel)
      ? authorizedPersonnel.find(p => p.id === inFrameIds[0])
      : null;
    const activeSubject = inFramePerson 
      ? inFramePerson.name 
      : ((authorizedPersonnel && authorizedPersonnel.length > 0) ? authorizedPersonnel[0].name : 'Tanvi P G');
    const activeHolderId = isHoldingKnife 
      ? (inFramePerson ? inFramePerson.id : ((authorizedPersonnel && authorizedPersonnel.length > 0) ? authorizedPersonnel[0].id : 'AUTH-001')) 
      : null;
    const newScore = isHoldingKnife ? (isFaceInFrame ? 95 : 85) : (isFaceInFrame ? 10 : 0);
    const newStatus = isHoldingKnife ? 'CRITICAL' : 'NORMAL';

    setCurrentScore(newScore);
    setCurrentStatus(newStatus);
    setFacilityStatus(newStatus === 'CRITICAL' ? 'CRITICAL' : 'NORMAL');
    setActiveObject(isHoldingKnife ? 'knife' : 'none');
    setKnifeHolderId(activeHolderId);

    setFusionBreakdown({
      identityLabel: isFaceInFrame ? `${activeSubject} (In Frame) (+0)` : 'Perimeter sweep clear',
      objectLabel: isHoldingKnife ? '⚠️ KNIFE VISIBLE' : 'Clean / No knife detected',
      score: newScore,
      status: newStatus,
      summary: isHoldingKnife 
        ? `⚠️ CRITICAL: KNIFE VISIBLE IN FEED! Person armed: ${activeSubject}. Threat score escalated to ${newScore}/100.` 
        : (isFaceInFrame ? `${activeSubject} active in optical feed. Perimeter normal.` : 'No faces or knives detected.')
    });

    if (newStatus === 'CRITICAL') {
      soundFx.playCritical();
      setShowEmergencyModal(true);
      const timeNow = getFormatTime();

      // Trigger Twilio call to Higher Authority
      dispatchTwilioAuthorityCall({
        reason: 'Real Knife Threat Triggered at Checkpoint',
        threatScore: newScore,
        subjectName: activeSubject
      });

      setDispatchLogs(prev => [
        {
          id: `DISP-CALL-${Date.now()}`,
          timestamp: timeNow,
          type: 'CRITICAL',
          status: 'CRITICAL',
          badge: 'TWILIO CALL',
          message: `${timeNow} — 📞 EMERGENCY VOICE CALL INITIATED to Higher Authority (${HIGHER_AUTHORITY_PHONE}) via Twilio! Threat Score: ${newScore}/100.`,
          zone: 'Gate 1 - Checkpoint Optical'
        },
        ...prev.slice(0, 19)
      ]);
    } else {
      soundFx.playNormal();
    }
  };

  // Execute the full 3-step Hackathon Demo Scenario (Scripted Walkthrough)
  const runDemoScenario = useCallback(() => {
    if (useWebcam) {
      console.log('[DEMO MODE] Disabled: Live camera mode is active.');
      return;
    }
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
    setInFrameIds([]);
    setKnifeHolderId(null);
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

      {/* Main Control Room Grid with Dynamic Touch Widgets */}
      <main className="flex-1 p-3 lg:p-4 max-w-[1920px] w-full mx-auto flex flex-col gap-3 relative z-10">
        {/* Touch Widget Cockpit Quick Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 bg-[#101221] border border-[#23273e] rounded-xl font-mono text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="font-bold text-slate-200 text-xs tracking-wider uppercase">Touch Widgets:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setShowRosterWidget(v => !v);
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all border ${
                showRosterWidget
                  ? 'bg-[#c9a24b]/20 text-[#e6b84d] border-[#c9a24b]/50 shadow-sm'
                  : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Touch to show or hide Personnel Roster"
            >
              <span>👥 Personnel Roster</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] ${showRosterWidget ? 'bg-[#c9a24b]/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {showRosterWidget ? 'OPEN' : 'MIN'}
              </span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setShowReasoningWidget(v => !v);
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all border ${
                showReasoningWidget
                  ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Touch to show or hide AI Reasoning Log"
            >
              <span>🧠 AI Reasoning</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] ${showReasoningWidget ? 'bg-cyan-900/60 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {showReasoningWidget ? 'OPEN' : 'MIN'}
              </span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setShowDispatchWidget(v => !v);
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all border ${
                showDispatchWidget
                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/50 shadow-sm'
                  : 'bg-black/50 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Touch to show or hide Dispatch Logs"
            >
              <span>📋 Dispatch Logs</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] ${showDispatchWidget ? 'bg-purple-900/60 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {showDispatchWidget ? 'OPEN' : 'MIN'}
              </span>
            </button>

            {/* Test Knife Threat Alert Pop-up */}
            <button
              onClick={() => {
                soundFx.playAlarmClock(3.0);
                setKnifeModalData({
                  personName: authorizedPersonnel[0]?.name || 'Tanvi P G',
                  threatScore: 95,
                  personPhoto: authorizedPersonnel[0]?.photo || null,
                  zone: 'Gate 1 - Checkpoint Optical',
                  confidence: 99,
                  isPenWeapon: false
                });
                setShowKnifeModal(true);
              }}
              className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/60 flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              title="Trigger Knife Threat Pop-up with 3s Alarm Clock Sound"
            >
              <span>⚠️ Test Knife Alert</span>
            </button>

            {/* Direct 3-Second Alarm Clock Sound Effect Test Button */}
            <button
              onClick={() => {
                soundFx.playAlarmClock(3.0);
              }}
              className="px-3 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/60 flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              title="Play 3-second alarm clock sound effect"
            >
              <span>⏰ Test Alarm (3s)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1">
          {/* LEFT PANEL: Live Personnel Roster */}
          {showRosterWidget && (
            <section className={`${showReasoningWidget ? 'lg:col-span-3' : 'lg:col-span-3'} flex flex-col gap-3 min-h-[460px] lg:min-h-0 animate-fadeIn`}>
              <PersonnelRoster
                authorizedPersonnel={authorizedPersonnel}
                currentDetectedFace={isFaceInFrame ? currentLiveFace : { facePresent: false }}
                inFrameIds={isFaceInFrame ? inFrameIds : []}
                isKnifeDetected={activeObject === 'knife' || manualSensors.weapons}
                knifeHolderId={knifeHolderId}
                threatScore={currentScore}
                activeCameraId={activeCameraId}
                onDeletePersonnel={handleDeletePersonnel}
                onResetPersonnel={handleResetPersonnel}
                onOpenKnifeAlert={() => {
                  setKnifeModalData({
                    personName: authorizedPersonnel[0]?.name || 'Tanvi P G',
                    threatScore: 95,
                    personPhoto: authorizedPersonnel[0]?.photo || null,
                    zone: 'Gate 1 - Checkpoint Optical',
                    confidence: 95
                  });
                  setShowKnifeModal(true);
                }}
              />
            </section>
          )}

          {/* CENTER PANEL: Risk Score Gauge + Camera HUD + Rebalanced Fusion Controls */}
          <section className={`${
            !showRosterWidget && !showReasoningWidget
              ? 'lg:col-span-12'
              : (!showRosterWidget || !showReasoningWidget ? 'lg:col-span-9' : 'lg:col-span-6')
          } flex flex-col min-h-[520px] lg:min-h-0 transition-all duration-300`}>
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

          {/* RIGHT PANEL: Explainable AI Reasoning Log + Raw JSON Feed */}
          {showReasoningWidget && (
            <section className={`${showRosterWidget ? 'lg:col-span-3' : 'lg:col-span-3'} flex flex-col min-h-[460px] lg:min-h-0 animate-fadeIn`}>
              <AIReasoningLog
                reasoningLines={currentEvent?.reasoning || []}
                telemetryData={currentEvent?.telemetry || {}}
                status={currentStatus}
                fusionBreakdown={fusionBreakdown}
              />
            </section>
          )}
        </div>

        {/* BOTTOM PANEL: Timestamped Tiered Emergency & Guard Dispatch Log */}
        {showDispatchWidget && (
          <section className="w-full animate-fadeIn">
            <DispatchLog
              dispatchLogs={dispatchLogs}
              onOpenCriticalModal={() => setShowEmergencyModal(true)}
            />
          </section>
        )}
      </main>

      {/* Modals */}
      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        currentEvent={currentEvent}
        riskScore={currentScore}
      />

      {/* Dedicated Knife / Weapon Threat Pop-up Modal */}
      <KnifeAlertModal
        isOpen={showKnifeModal}
        onClose={() => setShowKnifeModal(false)}
        personName={knifeModalData?.personName || 'Tanvi P G'}
        threatScore={knifeModalData?.threatScore || 95}
        personPhoto={knifeModalData?.personPhoto}
        zone={knifeModalData?.zone || 'Gate 1 - Checkpoint Optical'}
        confidence={knifeModalData?.confidence || 95}
        isPenWeapon={knifeModalData?.isPenWeapon || false}
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
        authorizedPersonnel={authorizedPersonnel}
        onDeletePersonnel={handleDeletePersonnel}
        onResetPersonnel={handleResetPersonnel}
      />

      <PhoneCameraModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        localIp={localIp}
      />
    </div>
  );
}
