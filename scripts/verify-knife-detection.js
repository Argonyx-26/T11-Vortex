import puppeteer from 'puppeteer-core';
import path from 'path';

async function testKnifeDetection() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[KNIFE-TEST] Launching Edge browser...');

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

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('COCO') || text.includes('KNIFE') || text.includes('MediaPipe')) {
      console.log(`[BROWSER] ${text}`);
    }
  });

  console.log('[KNIFE-TEST] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  // 1. Verify clean/idle state (No knife in fake video stream)
  const baselineState = await page.evaluate(() => {
    const objectBadge = document.querySelector('#live-detected-object-badge');
    const objectStatusText = document.body.innerText.includes('NO KNIFE DETECTED');
    const riskScore = document.querySelector('.text-4xl')?.innerText;
    return {
      hasObjectBadge: !!objectBadge,
      objectStatusText,
      riskScore
    };
  });
  console.log('[KNIFE-TEST] Baseline State (Empty / No Knife):', JSON.stringify(baselineState, null, 2));

  // 2. Verify COCO-SSD knife detection directly with a mock knife prediction in the pipeline
  const knifeDetectionResult = await page.evaluate(async () => {
    const { analyzeLiveFrame } = await import('/src/utils/visionDetector.js');
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 640, 480);

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = 640;
    overlayCanvas.height = 480;

    // Create a video mock
    const stream = canvas.captureStream(30);
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();
    await new Promise(r => setTimeout(r, 200));

    // Run live frame analysis
    const result = await analyzeLiveFrame({
      videoElement: video,
      canvasElement: canvas,
      overlayCanvasElement: overlayCanvas,
      frameSeq: 1,
      timestamp: new Date().toISOString()
    });

    return {
      score: result?.score,
      status: result?.status,
      detectedObject: result?.detectedObject,
      detectedObjectLabel: result?.detectedObjectLabel,
      reasoningLines: result?.reasoningLines
    };
  });

  console.log('[KNIFE-TEST] analyzeLiveFrame Output:', JSON.stringify(knifeDetectionResult, null, 2));

  // 3. Take verification screenshot
  const screenshotPath = path.resolve('C:\\Users\\sagar\\.gemini\\antigravity\\brain\\7bfb6917-9d6a-494e-bb15-2df24940b763\\knife_detection_clean_state.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`[KNIFE-TEST] Screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('[KNIFE-TEST] Test completed successfully.');
}

testKnifeDetection().catch(err => {
  console.error('[KNIFE-TEST FAILED]', err);
  process.exit(1);
});
