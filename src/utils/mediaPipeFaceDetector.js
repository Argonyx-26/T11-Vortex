// VORTEX MediaPipe Face Detector Integration
// Official Google MediaPipe Tasks Vision Face Detector in VIDEO mode
// 100% Client-side. Does NOT recognize identities or infer intent.
// Detects faces, reports face count, and draws glowing tactical bounding boxes.

import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

let faceDetector = null;
let detectorPromise = null;
let isInitializing = false;

let detectorState = {
  status: 'idle', // 'idle' | 'loading' | 'ready' | 'error'
  error: null,
  loadedAt: null,
  durationSec: null
};

let lastFrameTimestampMs = -1;

export function getFaceDetectorState() {
  return { ...detectorState };
}

/**
 * Loads the official MediaPipe Face Detector model.
 * Configured in VIDEO mode using the official BlazeFace short range model asset.
 */
export async function initMediaPipeFaceDetector() {
  if (faceDetector) return faceDetector;
  if (isInitializing && detectorPromise) return detectorPromise;

  isInitializing = true;
  detectorState.status = 'loading';
  detectorState.error = null;
  console.log('[MediaPipe FaceDetector] Loading vision wasm and model...');
  const t0 = performance.now();

  detectorPromise = (async () => {
    try {
      // 1. Load WebAssembly vision task files from official CDN
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm'
      );

      // 2. Create FaceDetector configured for VIDEO mode
      let detector;
      try {
        detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          minDetectionConfidence: 0.35
        });
      } catch (gpuErr) {
        console.warn('[MediaPipe FaceDetector] GPU delegate unavailable, falling back to CPU:', gpuErr);
        detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          minDetectionConfidence: 0.35
        });
      }

      const t1 = performance.now();
      const durationSec = parseFloat(((t1 - t0) / 1000).toFixed(2));
      faceDetector = detector;
      detectorState.status = 'ready';
      detectorState.loadedAt = new Date().toISOString();
      detectorState.durationSec = durationSec;
      isInitializing = false;

      console.log(`[MediaPipe FaceDetector] ✓ Ready in ${durationSec}s at ${detectorState.loadedAt}`);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mediapipe-model-status', { detail: { ...detectorState } }));
      }
      return detector;
    } catch (err) {
      console.error('[MediaPipe FaceDetector] Initialization error:', err);
      detectorState.status = 'error';
      detectorState.error = err.message || 'Failed to load MediaPipe Face Detector';
      isInitializing = false;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mediapipe-model-status', { detail: { ...detectorState } }));
      }
      return null;
    }
  })();

  return detectorPromise;
}

/**
 * Runs detectForVideo() repeatedly on new webcam frames.
 * Returns detected faces array and total count.
 */
export function detectFacesInVideo(videoElement, canvasElement = null) {
  if (!faceDetector) {
    return { faces: [], faceCount: 0 };
  }

  // Ensure video is actively playing if paused
  if (videoElement && videoElement.paused && videoElement.srcObject) {
    videoElement.play().catch(() => {});
  }

  // Prefer canvasElement because 2D canvas is 100% compatible with WebGL texture upload
  const primaryTarget = (canvasElement && canvasElement.width > 0)
    ? canvasElement
    : (videoElement && videoElement.readyState >= 2 && !videoElement.paused)
    ? videoElement
    : null;

  if (!primaryTarget) {
    return { faces: [], faceCount: 0 };
  }

  const nowMs = performance.now();
  const timestampMs = nowMs > lastFrameTimestampMs ? nowMs : lastFrameTimestampMs + 1;
  lastFrameTimestampMs = timestampMs;

  try {
    let result = faceDetector.detectForVideo(primaryTarget, timestampMs);
    let faces = (result && result.detections) ? result.detections : [];

    // Fallback: If primary target returned 0 and video is available, retry on video
    if (faces.length === 0 && primaryTarget === canvasElement && videoElement && videoElement.readyState >= 2 && !videoElement.paused) {
      try {
        const fallbackRes = faceDetector.detectForVideo(videoElement, timestampMs + 1);
        if (fallbackRes && fallbackRes.detections && fallbackRes.detections.length > 0) {
          faces = fallbackRes.detections;
          lastFrameTimestampMs = timestampMs + 1;
        }
      } catch (fallbackErr) {}
    }

    return {
      faces,
      faceCount: faces.length
    };
  } catch (err) {
    // If canvas failed, try videoElement
    if (primaryTarget === canvasElement && videoElement && videoElement.readyState >= 2) {
      try {
        const fallbackRes = faceDetector.detectForVideo(videoElement, timestampMs + 1);
        const faces = (fallbackRes && fallbackRes.detections) ? fallbackRes.detections : [];
        lastFrameTimestampMs = timestampMs + 1;
        return { faces, faceCount: faces.length };
      } catch (fallbackErr) {}
    }
    console.warn('[MediaPipe FaceDetector] Frame detection error:', err.message);
    return { faces: [], faceCount: 0, error: err.message };
  }
}

/**
 * Draws tactical bounding boxes directly around each detected face
 * on the canvas overlay positioned over the video feed.
 */
export function drawFaceBoundingBoxes({ canvas, video, faces }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!faces || faces.length === 0) return;

  // Match canvas dimensions to video
  const vw = video?.videoWidth || 640;
  const vh = video?.videoHeight || 480;
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width = vw;
    canvas.height = vh;
  }

  faces.forEach((face, idx) => {
    if (!face.boundingBox) return;
    const { originX, originY, width, height } = face.boundingBox;
    const score = face.categories?.[0]?.score || 0.9;
    const confidencePct = Math.round(score * 100);

    // The webcam video element has -scale-x-100 (mirrored).
    // Mirror the X coordinate so the box tracks the mirrored video while text is readable:
    const drawX = canvas.width - (originX + width);
    const drawY = originY;

    const strokeColor = '#06b6d4'; // Cyan
    const fillColor = 'rgba(6, 182, 212, 0.12)';
    const bannerBg = 'rgba(8, 51, 68, 0.92)';

    // 1. Shaded area
    ctx.fillStyle = fillColor;
    ctx.fillRect(drawX, drawY, width, height);

    // 2. Glowing bounding box
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 8;
    ctx.strokeRect(drawX, drawY, width, height);
    ctx.restore();

    // 3. Corner brackets for tactical HUD look
    const bLen = Math.min(16, width / 4, height / 4);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + bLen);
    ctx.lineTo(drawX, drawY);
    ctx.lineTo(drawX + bLen, drawY);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(drawX + width - bLen, drawY);
    ctx.lineTo(drawX + width, drawY);
    ctx.lineTo(drawX + width, drawY + bLen);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + height - bLen);
    ctx.lineTo(drawX, drawY + height);
    ctx.lineTo(drawX + bLen, drawY + height);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(drawX + width - bLen, drawY + height);
    ctx.lineTo(drawX + width, drawY + height);
    ctx.lineTo(drawX + width, drawY + height - bLen);
    ctx.stroke();

    // 4. Label banner with face index and detection confidence
    const labelText = faces.length > 1 ? `FACE #${idx + 1} (${confidencePct}%)` : `FACE DETECTED (${confidencePct}%)`;
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    const textWidth = ctx.measureText(labelText).width;
    const tagW = textWidth + 14;
    const tagH = 20;
    const tagY = Math.max(2, drawY - tagH - 3);

    // Pill background
    ctx.fillStyle = bannerBg;
    ctx.fillRect(drawX, tagY, tagW, tagH);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(drawX, tagY, tagW, tagH);

    // Pill text
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, drawX + 7, tagY + tagH / 2);
  });
}
