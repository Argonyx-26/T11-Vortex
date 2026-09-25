import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function runDiagnostic() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[DIAGNOSTIC] Launching Edge browser...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('[DIAGNOSTIC] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Read fresh_live_frame.jpg as base64
  const frameBuffer = fs.readFileSync('fresh_live_frame.jpg');
  const base64Img = `data:image/jpeg;base64,${frameBuffer.toString('base64')}`;

  const results = await page.evaluate(async (frameDataUrl) => {
    const { initMediaPipeFaceDetector, detectFacesInVideo, getFaceDetectorState } = await import('/src/utils/mediaPipeFaceDetector.js');
    const { initVisionModel } = await import('/src/utils/visionDetectorCoco.js');

    const faceDetector = await initMediaPipeFaceDetector();
    const cocoModel = await initVisionModel();

    // 1. Create canvas for live frame
    const img = new Image();
    img.src = frameDataUrl;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 640, 480);

    // Test MediaPipe FaceDetector
    let mpFaces = [];
    try {
      const ts = performance.now();
      const res = faceDetector.detectForVideo(canvas, ts);
      mpFaces = res?.detections || [];
    } catch (err) {
      console.error('MediaPipe error:', err);
    }

    // Test COCO-SSD raw
    let cocoAll = [];
    try {
      cocoAll = await cocoModel.detect(canvas, 20, 0.01);
    } catch (err) {
      console.error('COCO error:', err);
    }

    // Now test with a synthetic knife drawn on canvas to verify COCO-SSD knife detection capability
    const knifeCanvas = document.createElement('canvas');
    knifeCanvas.width = 640;
    knifeCanvas.height = 480;
    const kCtx = knifeCanvas.getContext('2d');
    kCtx.drawImage(img, 0, 0, 640, 480);
    // Draw an actual realistic kitchen knife shape or large blade
    // Silver blade
    kCtx.fillStyle = '#d0d4d8';
    kCtx.beginPath();
    kCtx.moveTo(250, 320);
    kCtx.lineTo(440, 310);
    kCtx.lineTo(460, 315);
    kCtx.lineTo(430, 335);
    kCtx.lineTo(250, 335);
    kCtx.closePath();
    kCtx.fill();
    // Black handle
    kCtx.fillStyle = '#1a1a1a';
    kCtx.fillRect(170, 318, 80, 18);

    let syntheticKnifePreds = [];
    try {
      syntheticKnifePreds = await cocoModel.detect(knifeCanvas, 20, 0.01);
    } catch (e) {}

    return {
      mediaPipe: {
        faceCount: mpFaces.length,
        faces: mpFaces.map(f => ({
          score: Math.round(f.categories[0].score * 100) + '%',
          bbox: f.boundingBox
        }))
      },
      cocoSSD: {
        totalDetections: cocoAll.length,
        detections: cocoAll.map(d => ({
          class: d.class,
          score: (d.score * 100).toFixed(1) + '%',
          bbox: d.bbox.map(Math.round)
        })),
        knifeFound: cocoAll.some(d => d.class === 'knife')
      },
      syntheticKnifeTest: {
        detections: syntheticKnifePreds.map(d => ({
          class: d.class,
          score: (d.score * 100).toFixed(1) + '%'
        }))
      }
    };
  }, base64Img);

  console.log('=================== FRESH FRAME RESULTS ===================');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

runDiagnostic().catch(err => {
  console.error('[DIAGNOSTIC CRASHED]', err);
  process.exit(1);
});
