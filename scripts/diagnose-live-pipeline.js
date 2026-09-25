import puppeteer from 'puppeteer-core';

async function diagnose() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[DIAGNOSE] Launching Edge browser...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log(`[PAGE CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`));
  page.on('pageerror', err => console.error(`[PAGE ERROR] ${err.message}`));

  console.log('[DIAGNOSE] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Inspect page live state
  const diagInfo = await page.evaluate(async () => {
    const video = document.querySelector('video');
    const overlayCanvas = document.querySelector('#checkpoint-camera-feed canvas:not(.hidden)');
    
    // Check models
    const { initMediaPipeFaceDetector, getFaceDetectorState } = await import('/src/utils/mediaPipeFaceDetector.js');
    const { initVisionModel } = await import('/src/utils/visionDetectorCoco.js');
    const { analyzeLiveFrame } = await import('/src/utils/visionDetector.js');

    const mpState = getFaceDetectorState();
    let cocoState = 'unknown';
    let cocoError = null;
    let cocoModel = null;
    try {
      cocoModel = await initVisionModel();
      cocoState = cocoModel ? 'loaded' : 'null';
    } catch (e) {
      cocoState = 'error';
      cocoError = e.message;
    }

    // Test COCO-SSD on video
    let cocoDetectOutput = null;
    let cocoDetectError = null;
    if (cocoModel && video) {
      try {
        const rawPreds = await cocoModel.detect(video, 20, 0.1);
        cocoDetectOutput = rawPreds;
      } catch (err) {
        cocoDetectError = err.message;
      }
    }

    // Test MediaPipe on video
    let mpDetectOutput = null;
    let mpDetectError = null;
    const mpDetector = await initMediaPipeFaceDetector();
    if (mpDetector && video) {
      try {
        const res = mpDetector.detectForVideo(video, performance.now());
        mpDetectOutput = res;
      } catch (err) {
        mpDetectError = err.message;
      }
    }

    return {
      videoInfo: {
        exists: !!video,
        readyState: video?.readyState,
        paused: video?.paused,
        videoWidth: video?.videoWidth,
        videoHeight: video?.videoHeight,
        hasSrcObject: !!video?.srcObject
      },
      overlayCanvas: {
        exists: !!overlayCanvas,
        width: overlayCanvas?.width,
        height: overlayCanvas?.height
      },
      mpState,
      mpDetectOutput,
      mpDetectError,
      cocoState,
      cocoError,
      cocoDetectOutput,
      cocoDetectError
    };
  });

  console.log('[DIAGNOSE RESULT]:\n', JSON.stringify(diagInfo, null, 2));

  await browser.close();
}

diagnose().catch(err => {
  console.error('[DIAGNOSE FAILED]', err);
  process.exit(1);
});
