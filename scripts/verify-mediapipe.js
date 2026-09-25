import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function verify() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[VERIFY] Launching Edge browser with fake media stream...');

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

  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('MediaPipe') || text.includes('VORTEX')) {
      console.log(`[BROWSER CONSOLE] ${text}`);
    }
  });

  page.on('pageerror', err => {
    console.error(`[PAGE ERROR]`, err.message);
  });

  console.log('[VERIFY] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for MediaPipe model loading or badge to settle
  console.log('[VERIFY] Waiting for MediaPipe Face Detector to initialize...');
  await new Promise(r => setTimeout(r, 6000));

  // Check MediaPipe badge text and class
  const badgeInfo = await page.evaluate(() => {
    const badge = document.querySelector('#mediapipe-status-badge');
    const noFaceEl = document.querySelector('#no-face-in-frame');
    const faceCountBadge = document.querySelector('#live-face-count-badge');
    const video = document.querySelector('video');
    const overlayCanvas = document.querySelector('#checkpoint-camera-feed canvas:not(.hidden)');
    const eventFeedLogs = document.querySelectorAll('#event-feed-list > div, .space-y-2 > div');
    const eventEmptyAlert = document.body.innerText.includes('NO ACTIVE SECURITY ALERTS');

    return {
      badgeText: badge ? badge.innerText : null,
      noFaceDetected: noFaceEl ? noFaceEl.innerText : null,
      faceCountBadgeText: faceCountBadge ? faceCountBadge.innerText : null,
      hasVideo: !!video,
      videoWidth: video ? video.videoWidth : null,
      videoHeight: video ? video.videoHeight : null,
      hasOverlayCanvas: !!overlayCanvas,
      canvasWidth: overlayCanvas ? overlayCanvas.width : null,
      canvasHeight: overlayCanvas ? overlayCanvas.height : null,
      eventEmptyAlert,
      pageTitle: document.title
    };
  });

  console.log('[VERIFY] Page Evaluation Result:', JSON.stringify(badgeInfo, null, 2));

  // Take screenshot for visual validation
  const screenshotDir = path.resolve('C:\\Users\\sagar\\.gemini\\antigravity\\brain\\7bfb6917-9d6a-494e-bb15-2df24940b763');
  const screenshotPath = path.join(screenshotDir, 'mediapipe_verification.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`[VERIFY] Screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('[VERIFY] Verification completed successfully.');
}

verify().catch(err => {
  console.error('[VERIFY FAILED]', err);
  process.exit(1);
});
