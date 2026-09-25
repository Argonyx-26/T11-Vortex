import puppeteer from 'puppeteer-core';
import path from 'path';

async function testDebuggedPipeline() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[DEBUG-VERIFY] Launching Edge browser...');

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

  const screeningLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('LIVE OPTICAL SCREENING') || text.includes('VORTEX') || text.includes('DEMO MODE')) {
      screeningLogs.push(text);
      console.log(`[BROWSER LOG] ${text}`);
    }
  });

  console.log('[DEBUG-VERIFY] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 4000));

  const pageState = await page.evaluate(() => {
    const video = document.querySelector('video');
    const demoBtn = document.querySelector('button[title*="Demo Mode"]');
    const objectScreeningBadge = document.body.innerText.includes('LIVE OBJECT SCAN');
    const noKnifeText = document.body.innerText.includes('NO KNIFE DETECTED');

    return {
      video: {
        exists: !!video,
        readyState: video ? video.readyState : null,
        paused: video ? video.paused : null,
        srcObjectAttached: !!video?.srcObject
      },
      demoButtonText: demoBtn ? demoBtn.innerText.replace(/\n/g, ' ') : null,
      demoButtonDisabled: demoBtn ? demoBtn.disabled : null,
      objectScreeningBadge,
      noKnifeText
    };
  });

  console.log('[DEBUG-VERIFY] Page State:\n', JSON.stringify(pageState, null, 2));

  // Take screenshot
  const screenshotPath = path.resolve('C:\\Users\\sagar\\.gemini\\antigravity\\brain\\7bfb6917-9d6a-494e-bb15-2df24940b763\\debugged_live_camera.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`[DEBUG-VERIFY] Screenshot saved to: ${screenshotPath}`);

  await browser.close();
  console.log('[DEBUG-VERIFY] Verification complete.');
}

testDebuggedPipeline().catch(err => {
  console.error('[DEBUG-VERIFY FAILED]', err);
  process.exit(1);
});
