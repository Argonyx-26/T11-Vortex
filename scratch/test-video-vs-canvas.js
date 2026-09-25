import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function testVideoVsCanvas() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[TEST] Launching Edge...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log(`[BROWSER CONSOLE] ${msg.text()}`));

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const frameBuffer = fs.readFileSync('fresh_live_frame.jpg');
  const base64Img = `data:image/jpeg;base64,${frameBuffer.toString('base64')}`;

  const result = await page.evaluate(async (frameDataUrl) => {
    const { initMediaPipeFaceDetector, detectFacesInVideo } = await import('/src/utils/mediaPipeFaceDetector.js');
    const { initVisionModel } = await import('/src/utils/visionDetectorCoco.js');

    const faceDetector = await initMediaPipeFaceDetector();
    const cocoModel = await initVisionModel();

    // 1. Draw image to a canvas
    const img = new Image();
    img.src = frameDataUrl;
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 640, 480);

    // 2. Stream this canvas into a HTML5 <video> element to simulate a real webcam video
    const stream = canvas.captureStream(30);
    const video = document.createElement('video');
    video.srcObject = stream;
    video.width = 640;
    video.height = 480;
    video.muted = true;
    video.playsInline = true;
    await video.play();

    // Wait for video to have frames
    await new Promise(r => setTimeout(r, 300));

    const videoState = {
      readyState: video.readyState,
      paused: video.paused,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    };

    // Test 1: MediaPipe on VIDEO element
    let mpVideoResult = null;
    let mpVideoError = null;
    try {
      const res = faceDetector.detectForVideo(video, performance.now());
      mpVideoResult = {
        count: res.detections.length,
        scores: res.detections.map(d => d.categories[0].score)
      };
    } catch (e) {
      mpVideoError = e.message;
    }

    // Test 2: MediaPipe on CANVAS element
    let mpCanvasResult = null;
    let mpCanvasError = null;
    try {
      const res = faceDetector.detectForVideo(canvas, performance.now() + 50);
      mpCanvasResult = {
        count: res.detections.length,
        scores: res.detections.map(d => d.categories[0].score)
      };
    } catch (e) {
      mpCanvasError = e.message;
    }

    // Test 3: COCO-SSD on VIDEO element
    let cocoVideoPreds = null;
    let cocoVideoError = null;
    try {
      cocoVideoPreds = await cocoModel.detect(video, 20, 0.05);
    } catch (e) {
      cocoVideoError = e.message;
    }

    // Test 4: COCO-SSD on CANVAS element
    let cocoCanvasPreds = null;
    let cocoCanvasError = null;
    try {
      cocoCanvasPreds = await cocoModel.detect(canvas, 20, 0.05);
    } catch (e) {
      cocoCanvasError = e.message;
    }

    return {
      videoState,
      mpVideoResult,
      mpVideoError,
      mpCanvasResult,
      mpCanvasError,
      cocoVideoPreds,
      cocoVideoError,
      cocoCanvasPreds,
      cocoCanvasError
    };
  }, base64Img);

  console.log('================ COMPARISON RESULTS ================');
  console.log(JSON.stringify(result, null, 2));

  await browser.close();
}

testVideoVsCanvas().catch(err => {
  console.error('[ERROR]', err);
  process.exit(1);
});
