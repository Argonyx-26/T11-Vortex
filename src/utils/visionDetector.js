// VORTEX Client-Side Object Vision & Neural Inference Engine
// Uses lightweight pretrained COCO-SSD via TensorFlow.js (CDN loaded for fast startup)
// 100% client-side: No external API calls, no Python backend object detection, no custom training.
// Bounded to knife (weight: 60) and scissors (weight: 10), drawn directly to canvas overlay.

import { calculateRebalancedScore } from './personnelStore';
import { identifyLiveFace } from './faceTracker';

let cocoModel = null;
let cocoModelPromise = null;
let isModelLoading = false;
let modelStats = {
  loadStartedAt: null,
  loadFinishedAt: null,
  loadDurationSeconds: null,
  loaded: false,
  error: null
};

export function getModelStats() {
  return { ...modelStats };
}

/**
 * Initializes and loads pretrained COCO-SSD model client-side.
 * Logs exact timestamps at start and completion for verification.
 */
export async function initVisionModel() {
  if (cocoModel) return cocoModel;
  if (isModelLoading && cocoModelPromise) return cocoModelPromise;

  isModelLoading = true;
  const startTime = performance.now();
  const startIso = new Date().toISOString();
  modelStats.loadStartedAt = startIso;
  console.log(`[COCO-SSD] Loading started at ${startIso}`);

  cocoModelPromise = (async () => {
    try {
      // Access COCO-SSD from CDN global (window.cocoSsd) or dynamic fallback
      let ssdModule = typeof window !== 'undefined' ? window.cocoSsd : null;
      if (!ssdModule) {
        console.log('[COCO-SSD] CDN script not yet ready on window, importing fallback...');
        ssdModule = await import('@tensorflow-models/coco-ssd');
      }

      // Pretrained lightweight COCO-SSD model (loads in ~1-2s)
      const model = await ssdModule.load();
      const endTime = performance.now();
      const endIso = new Date().toISOString();
      const durationSec = parseFloat(((endTime - startTime) / 1000).toFixed(2));

      modelStats.loadFinishedAt = endIso;
      modelStats.loadDurationSeconds = durationSec;
      modelStats.loaded = true;
      cocoModel = model;
      isModelLoading = false;

      console.log(`[COCO-SSD] ✓ Model loaded successfully in ${durationSec}s at ${endIso}`);
      window.dispatchEvent(new CustomEvent('coco-model-loaded', { detail: { durationSec, endIso } }));
      return model;
    } catch (err) {
      console.error('[COCO-SSD] Error loading model:', err);
      modelStats.error = err.message;
      isModelLoading = false;
      return null;
    }
  })();

  return cocoModelPromise;
}

// Auto-trigger loading on script import / page load
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initVisionModel();
  } else {
    window.addEventListener('load', () => initVisionModel());
  }
}

/**
 * Draw bounding boxes with class name and confidence score directly
 * on a canvas overlay positioned over the video feed.
 */
export function drawWeaponBoundingBoxes({ canvas, video, predictions }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous frame overlay
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!predictions || predictions.length === 0) return;

  // Synchronize internal canvas resolution with video dimensions
  const vw = video?.videoWidth || 640;
  const vh = video?.videoHeight || 480;
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width = vw;
    canvas.height = vh;
  }

  // Filter strictly to knife and scissors
  const weaponPreds = predictions.filter(p => p.class === 'knife' || p.class === 'scissors');
  if (weaponPreds.length === 0) return;

  weaponPreds.forEach(pred => {
    const [x, y, w, h] = pred.bbox;
    const isKnife = pred.class === 'knife';
    const weight = isKnife ? 60 : 10;
    const confidencePct = Math.round(pred.score * 100);

    // The live video feed is horizontally mirrored (transform -scale-x-100)
    // To match on-screen position while keeping text readable, mirror the X coordinate
    const drawX = canvas.width - (x + w);
    const drawY = y;

    const strokeColor = isKnife ? '#ef4444' : '#f59e0b';
    const fillColor = isKnife ? 'rgba(239, 68, 68, 0.16)' : 'rgba(245, 158, 11, 0.16)';
    const bannerBg = isKnife ? 'rgba(185, 28, 28, 0.95)' : 'rgba(180, 83, 9, 0.95)';

    // Highlight area
    ctx.fillStyle = fillColor;
    ctx.fillRect(drawX, drawY, w, h);

    // Glowing bounding box
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 8;
    ctx.strokeRect(drawX, drawY, w, h);
    ctx.restore();

    // Corner brackets for tactical HUD look
    const bLen = Math.min(18, w / 3, h / 3);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + bLen);
    ctx.lineTo(drawX, drawY);
    ctx.lineTo(drawX + bLen, drawY);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(drawX + w - bLen, drawY);
    ctx.lineTo(drawX + w, drawY);
    ctx.lineTo(drawX + w, drawY + bLen);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + h - bLen);
    ctx.lineTo(drawX, drawY + h);
    ctx.lineTo(drawX + bLen, drawY + h);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(drawX + w - bLen, drawY + h);
    ctx.lineTo(drawX + w, drawY + h);
    ctx.lineTo(drawX + w, drawY + h - bLen);
    ctx.stroke();

    // Label banner with class name, confidence, and danger weight
    const labelText = `${pred.class.toUpperCase()} ${confidencePct}% (+${weight})`;
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    const textWidth = ctx.measureText(labelText).width;
    const tagW = textWidth + 14;
    const tagH = 22;
    const tagY = Math.max(2, drawY - tagH - 3);

    // Pill background
    ctx.fillStyle = bannerBg;
    ctx.fillRect(drawX, tagY, tagW, tagH);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(drawX, tagY, tagW, tagH);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, drawX + 7, tagY + tagH / 2);
  });
}

// Normalized skin-tone / facial centroid detector for bounding box tracking
function analyzeFaceCentroid(ctx, width, height) {
  try {
    const step = 4;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let skinCount = 0;
    let sumX = 0;
    let sumY = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const total = r + g + b;
        if (total > 80) {
          const rn = r / total;
          const gn = g / total;
          if (rn > 0.35 && rn < 0.58 && gn > 0.26 && gn < 0.38 && r > g && g > b) {
            skinCount++;
            sumX += x;
            sumY += y;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
    }

    const minSkinThreshold = (width * height) / (step * step * 70);
    if (skinCount >= minSkinThreshold) {
      const cx = sumX / skinCount;
      const cy = sumY / skinCount;
      const bw = Math.max(80, Math.min(width * 0.6, (maxX - minX) * 1.1));
      const bh = Math.max(90, Math.min(height * 0.7, (maxY - minY) * 1.1));

      return {
        detected: true,
        x: Math.max(10, cx - bw / 2),
        y: Math.max(10, cy - bh / 2),
        width: bw,
        height: bh,
        xPercent: Math.max(5, Math.min(75, ((cx - bw / 2) / width) * 100)),
        yPercent: Math.max(5, Math.min(65, ((cy - bh / 2) / height) * 100)),
        widthPercent: Math.max(22, Math.min(50, (bw / width) * 100)),
        heightPercent: Math.max(30, Math.min(65, (bh / height) * 100))
      };
    }
  } catch (e) {
    console.warn('[VORTEX VISION] Skin analysis error:', e);
  }

  return {
    detected: false,
    xPercent: 35,
    yPercent: 15,
    widthPercent: 30,
    heightPercent: 55
  };
}

// Biometric vector computation for local face comparison
function computeBiometricVector(ctx, box) {
  try {
    const fx = Math.max(0, Math.round(box.x || 100));
    const fy = Math.max(0, Math.round(box.y || 80));
    const fw = Math.max(20, Math.round(box.width || 120));
    const fh = Math.max(20, Math.round(box.height || 140));

    const imgData = ctx.getImageData(fx, fy, fw, fh);
    const data = imgData.data;
    const vec = [];
    const cellW = Math.max(1, Math.floor(fw / 4));
    const cellH = Math.max(1, Math.floor(fh / 4));

    for (let gy = 0; gy < 4; gy++) {
      for (let gx = 0; gx < 4; gx++) {
        let sum = 0;
        let count = 0;
        for (let y = gy * cellH; y < (gy + 1) * cellH; y += 2) {
          for (let x = gx * cellW; x < (gx + 1) * cellW; x += 2) {
            const idx = (y * fw + x) * 4;
            if (idx < data.length) {
              const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255.0;
              sum += lum;
              count++;
            }
          }
        }
        const val = count > 0 ? (sum / count) - 0.5 : 0;
        vec.push(parseFloat(val.toFixed(4)));
      }
    }
    return vec;
  } catch {
    return [0.05, -0.02, 0.08, -0.04, 0.02, -0.01, 0.06, -0.03, 0.04, -0.05, 0.02, 0.03, -0.01, 0.04, 0.06, -0.02];
  }
}

/**
 * Live Frame Analysis Pipeline (100% Client-Side):
 * 1. Executes pretrained COCO-SSD client-side detection on videoElement
 * 2. Filters strictly to 'knife' and 'scissors'
 * 3. Assigns risk weights: knife = 60, scissors = 10
 * 4. Draws bounding boxes on overlay canvas
 * 5. Correlates with face recognition against authorized personnel
 * 6. Calculates rebalanced fusion score (0-100)
 */
export async function analyzeLiveFrame({ videoElement, canvasElement, overlayCanvasElement, frameSeq, timestamp }) {
  if (!videoElement || !canvasElement) return null;

  const width = canvasElement.width || 640;
  const height = canvasElement.height || 480;
  const ctx = canvasElement.getContext('2d', { willReadFrequently: true });

  // 1. Draw fresh mirrored video frame to capture canvas for face analysis
  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(videoElement, -width, 0, width, height);
  ctx.restore();

  // 2. Face tracking
  const skinTrack = analyzeFaceCentroid(ctx, width, height);

  // 3. Client-Side COCO-SSD Object Detection
  let model = cocoModel;
  if (!model && !isModelLoading) {
    model = await initVisionModel();
  }

  let predictions = [];
  if (model) {
    try {
      predictions = await model.detect(videoElement);
    } catch (e) {
      console.warn('[COCO-SSD] Frame detect error:', e);
    }
  }

  // Check if person is in frame
  const personPred = predictions.find(p => p.class === 'person');
  const isPersonInFrame = Boolean(personPred) || skinTrack.detected;

  let faceBox = skinTrack;
  if (personPred && personPred.bbox) {
    const [px, py, pw, ph] = personPred.bbox;
    // Mirrored person X coordinate for UI HUD
    const mirroredPx = width - (px + pw);
    faceBox = {
      detected: true,
      x: mirroredPx,
      y: py,
      width: pw,
      height: ph * 0.45,
      xPercent: Math.max(5, Math.min(75, (mirroredPx / width) * 100)),
      yPercent: Math.max(5, Math.min(65, (py / height) * 100)),
      widthPercent: Math.max(20, Math.min(50, (pw / width) * 100)),
      heightPercent: Math.max(25, Math.min(55, ((ph * 0.45) / height) * 100))
    };
  }

  // 4. Filter strictly to 'knife' and 'scissors' classes
  const weaponPredictions = predictions.filter(p => p.class === 'knife' || p.class === 'scissors');

  // Draw bounding boxes on canvas overlay positioned over video feed
  if (overlayCanvasElement) {
    drawWeaponBoundingBoxes({
      canvas: overlayCanvasElement,
      video: videoElement,
      predictions: weaponPredictions
    });
  }

  // 5. Assign risk weights: knife = 60, scissors = 10
  let detectedObject = 'none';
  let detectedObjectLabel = 'Clean / None';
  let objectDangerWeight = 0;
  let objectConfidence = 0;
  let objectBox = null;

  if (weaponPredictions.length > 0) {
    // Check knife first (highest threat: 60)
    const knifePred = weaponPredictions.find(p => p.class === 'knife');
    const scissorsPred = weaponPredictions.find(p => p.class === 'scissors');

    if (knifePred) {
      detectedObject = 'knife';
      detectedObjectLabel = 'Knife (Blade Exposed) (+60)';
      objectDangerWeight = 60;
      objectConfidence = Math.round(knifePred.score * 100);
      objectBox = knifePred.bbox;
    } else if (scissorsPred) {
      detectedObject = 'scissors';
      detectedObjectLabel = 'Scissors / Small Sharp (+10)';
      objectDangerWeight = 10;
      objectConfidence = Math.round(scissorsPred.score * 100);
      objectBox = scissorsPred.bbox;
    }
  }

  // 6. Face Recognition against Authorized Personnel Store
  let matchedPerson = null;
  let isAuthorized = false;
  let displayName = 'Unknown User 1';

  if (isPersonInFrame) {
    const featureVec = computeBiometricVector(ctx, faceBox);
    const idResult = identifyLiveFace({
      facePresent: true,
      encoding: featureVec
    });
    isAuthorized = idResult.isAuthorized;
    displayName = idResult.name;
    matchedPerson = idResult;
  }

  // 7. Calculate Rebalanced Fusion Score (Pure Identity + Object Danger)
  const scoreBreakdown = calculateRebalancedScore(isAuthorized, detectedObject, displayName);

  return {
    frameSeq,
    timestamp,
    isPersonInFrame,
    faceBox,
    isAuthorized,
    displayName,
    matchedPerson,
    detectedObject,
    detectedObjectLabel,
    objectDangerWeight,
    objectConfidence,
    objectBox,
    weaponPredictions,
    score: scoreBreakdown.score,
    status: scoreBreakdown.status,
    fusionBreakdown: scoreBreakdown,
    inferenceEngineSource: 'Client-Side TensorFlow.js COCO-SSD'
  };
}
