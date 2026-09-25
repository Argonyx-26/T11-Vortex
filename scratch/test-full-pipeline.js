import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function testFullPipeline() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[TEST] Launching Edge browser...');

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

  page.on('console', msg => console.log(`[PAGE LOG] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[PAGE ERROR] ${err.message}`));

  console.log('[TEST] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Read fresh_live_frame.jpg as base64
  const frameBuffer = fs.readFileSync('fresh_live_frame.jpg');
  const base64Img = `data:image/jpeg;base64,${frameBuffer.toString('base64')}`;

  const testReport = await page.evaluate(async (frameDataUrl) => {
    const { initMediaPipeFaceDetector, detectFacesInVideo } = await import('/src/utils/mediaPipeFaceDetector.js');
    const { initVisionModel } = await import('/src/utils/visionDetectorCoco.js');
    const { analyzeLiveFrame } = await import('/src/utils/visionDetector.js');

    await initMediaPipeFaceDetector();
    await initVisionModel();

    // 1. Draw fresh_live_frame.jpg onto a 640x480 canvas
    const img = new Image();
    img.src = frameDataUrl;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 640, 480);

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = 640;
    overlayCanvas.height = 480;

    // Test Case 1: Normal Live Face Frame (no knife)
    const resNoKnife = await analyzeLiveFrame({
      videoElement: null,
      canvasElement: canvas,
      overlayCanvasElement: overlayCanvas,
      frameSeq: 101,
      timestamp: new Date().toISOString()
    });

    // Test Case 2: Frame with Person + Knife
    const knifeCanvas = document.createElement('canvas');
    knifeCanvas.width = 640;
    knifeCanvas.height = 480;
    const kCtx = knifeCanvas.getContext('2d', { willReadFrequently: true });
    kCtx.drawImage(img, 0, 0, 640, 480);

    // Draw realistic kitchen knife in hand/chest area
    // Silver blade
    kCtx.fillStyle = '#d1d5db';
    kCtx.beginPath();
    kCtx.moveTo(250, 320);
    kCtx.lineTo(440, 310);
    kCtx.lineTo(470, 315);
    kCtx.lineTo(430, 340);
    kCtx.lineTo(250, 340);
    kCtx.closePath();
    kCtx.fill();
    // Dark handle
    kCtx.fillStyle = '#1f2937';
    kCtx.fillRect(170, 318, 80, 22);

    const resWithKnife = await analyzeLiveFrame({
      videoElement: null,
      canvasElement: knifeCanvas,
      overlayCanvasElement: overlayCanvas,
      frameSeq: 102,
      timestamp: new Date().toISOString()
    });

    return {
      caseNoKnife: {
        isPersonInFrame: resNoKnife.isPersonInFrame,
        faceCount: resNoKnife.faceCount,
        detectedObject: resNoKnife.detectedObject,
        score: resNoKnife.score,
        status: resNoKnife.status,
        displayName: resNoKnife.displayName,
        primaryConfidence: Math.round(resNoKnife.primaryConfidence * 100) + '%'
      },
      caseWithKnife: {
        isPersonInFrame: resWithKnife.isPersonInFrame,
        faceCount: resWithKnife.faceCount,
        detectedObject: resWithKnife.detectedObject,
        detectedObjectLabel: resWithKnife.detectedObjectLabel,
        score: resWithKnife.score,
        status: resWithKnife.status,
        displayName: resWithKnife.displayName
      }
    };
  }, base64Img);

  console.log('=================== TEST REPORT ===================');
  console.log(JSON.stringify(testReport, null, 2));

  await page.screenshot({ path: 'verify_pipeline_working.png' });
  console.log('Saved verify_pipeline_working.png');

  await browser.close();
}

testFullPipeline().catch(err => {
  console.error('[TEST FAILED]', err);
  process.exit(1);
});
