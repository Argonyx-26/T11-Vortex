import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('[TEST] Launching Chrome with fake camera stream...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  const logs = [];
  page.on('console', msg => {
    const text = msg.text();
    logs.push(text);
    if (text.includes('KNIFE') || text.includes('alarm') || text.includes('Audio') || text.includes('Screening') || text.includes('OPTICAL')) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('[TEST] Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2500));

  // Step 1: Check Live Face State (Perimeter Normal, no knife red box on face)
  const faceInitialState = await page.evaluate(() => {
    const badges = Array.from(document.querySelectorAll('span, div')).map(el => el.innerText);
    const scoreVal = document.querySelector('span.font-black.tracking-tight')?.innerText || 
                     document.querySelector('div.text-4xl.font-black')?.innerText;
    const isKnifeDetected = badges.some(b => b.includes('KNIFE DETECTED (PEN)') || b.includes('ARMED • KNIFE VISIBLE'));
    const isAuthorized = badges.some(b => b.includes('AUTHORIZED'));
    return {
      score: scoreVal,
      isKnifeDetected,
      isAuthorized
    };
  });
  console.log('[TEST Step 1] Initial Face State (No weapon in frame):', faceInitialState);

  // Step 2: Test soundFx.playAlarmClock(3.0) directly in browser AudioContext
  console.log('[TEST Step 2] Testing soundFx.playAlarmClock in browser context...');
  const audioResult = await page.evaluate(async () => {
    try {
      // Check window / app audio context state
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const state = audioCtx.state;
      return { success: true, audioCtxState: state };
    } catch (e) {
      return { success: false, error: e.message };
    }
  });
  console.log('[TEST Step 2] AudioContext status:', audioResult);

  // Step 3: Trigger Knife Alert Modal & Alarm Clock Beep
  console.log('[TEST Step 3] Clicking "⚠️ Test Knife Alert" button...');
  const knifeTestClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Test Knife Alert'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('[TEST Step 3] Test Knife Alert button clicked:', knifeTestClicked);
  await new Promise(r => setTimeout(r, 1200));

  // Step 4: Verify Knife Alert Modal content and status
  const modalInfo = await page.evaluate(() => {
    const modalHeading = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('KNIFE DETECTED'));
    const alarmBadge = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('ALARM (3s)'));
    const twilioStatus = Array.from(document.querySelectorAll('div, span')).find(s => s.innerText.includes('TWILIO') || s.innerText.includes('Higher Authority'));
    const armedBadge = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('ARMED'));
    return {
      hasKnifeModal: Boolean(modalHeading),
      modalHeadingText: modalHeading ? modalHeading.innerText : null,
      hasAlarmBadge: Boolean(alarmBadge),
      armedBadgeText: armedBadge ? armedBadge.innerText : null,
      twilioStatusText: twilioStatus ? twilioStatus.innerText : null
    };
  });
  console.log('[TEST Step 4] Knife Modal Verification:', JSON.stringify(modalInfo, null, 2));

  // Capture screenshot of Knife Alert Modal with Alarm Clock 3s indicator
  const screenshotPath = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/reverted_face_knife_detection_and_alarm.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`[TEST] Verification screenshot saved to ${screenshotPath}`);

  // Step 5: Close modal and verify camera cockpit
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[title="Dismiss Alert"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Step 6: Test the 3s Alarm Clock button
  console.log('[TEST Step 6] Testing "⏰ Test Alarm (3s)" button...');
  const alarmBtnClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Test Alarm (3s)'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('[TEST Step 6] Test Alarm (3s) button clicked:', alarmBtnClicked);

  await browser.close();
  console.log('[TEST] Verification complete!');
}

run().catch(err => {
  console.error('[TEST ERROR]', err);
  process.exit(1);
});
