import puppeteer from 'puppeteer-core';
import path from 'path';

async function testFaceDetection() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[FACE-TEST] Launching Edge browser...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log(`[BROWSER] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[PAGE-ERR] ${err.message}`));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // In the browser, inject a portrait test image to the video/canvas and test MediaPipe detectFacesInVideo
  const detectionResult = await page.evaluate(async () => {
    // 1. Create an offscreen video element with a real face video or test canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    // Standard test portrait photo
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80';
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 400, 400);

    // Call window MediaPipe detector module
    const { initMediaPipeFaceDetector } = await import('/src/utils/mediaPipeFaceDetector.js');
    const detector = await initMediaPipeFaceDetector();
    
    // In VIDEO mode, detectForVideo requires a video element or video-like source.
    // Or we can create an ImageBitmap / HTMLVideoElement from canvas captureStream:
    const stream = canvas.captureStream(30);
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();

    // Give it a brief moment to produce a frame
    await new Promise(r => setTimeout(r, 300));

    const result = detector.detectForVideo(video, performance.now());

    return {
      detectionsCount: result?.detections?.length || 0,
      detections: result?.detections?.map(d => ({
        boundingBox: d.boundingBox,
        score: d.categories?.[0]?.score
      }))
    };
  });

  console.log('[FACE-TEST] Detection Result with portrait image:', JSON.stringify(detectionResult, null, 2));

  await browser.close();
}

testFaceDetection().catch(err => {
  console.error('[FACE-TEST ERROR]', err);
  process.exit(1);
});
