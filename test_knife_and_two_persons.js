import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('[TEST] Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[MediaPipe') || text.includes('[COCO-SSD') || text.includes('KNIFE') || text.includes('FACES')) {
      console.log('BROWSER CONSOLE:', text);
    }
  });

  console.log('[TEST] Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  // TEST 1: Activate Both (Tanvi & Sanidhya) in frame
  console.log('[TEST 1] Clicking "Both (Tanvi & Sanidhya)" switcher...');
  const bothBtnClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('Both (Tanvi & Sanidhya)'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('[TEST 1] "Both (Tanvi & Sanidhya)" clicked:', bothBtnClicked);
  await new Promise(r => setTimeout(r, 1000));

  // Inspect Roster Cards with 2 persons in frame
  const twoPersonsRoster = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('div.p-2.rounded-lg.border'));
    return cards.slice(0, 4).map(c => c.innerText.replace(/\n/g, ' | '));
  });
  console.log('[TEST 1] Roster with 2 persons in frame:', JSON.stringify(twoPersonsRoster, null, 2));

  // TEST 2: Trigger Knife Detection
  console.log('[TEST 2] Triggering Knife Detection via TEST KNIFE...');
  const knifeBtnClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes('TEST KNIFE'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('[TEST 2] TEST KNIFE button clicked:', knifeBtnClicked);
  await new Promise(r => setTimeout(r, 1200));

  // Inspect Roster and Alert Banner when knife is visible
  const knifeEvaluation = await page.evaluate(() => {
    const banner = document.getElementById('knife-visible-alert-banner');
    const badge = document.getElementById('live-detected-object-badge');
    const cards = Array.from(document.querySelectorAll('div.p-2.rounded-lg.border'));
    
    // Risk score gauge
    const scoreVal = document.querySelector('span.font-black.tracking-tight')?.innerText || 
                     document.querySelector('div.text-4xl.font-black')?.innerText;
    const statusVal = document.querySelector('div.font-black.tracking-widest')?.innerText || 
                      document.querySelector('div.font-black.uppercase')?.innerText;

    return {
      bannerPresent: Boolean(banner),
      bannerText: banner ? banner.innerText : null,
      badgeText: badge ? badge.innerText : null,
      currentScore: scoreVal,
      currentStatus: statusVal,
      rosterTopFour: cards.slice(0, 4).map(c => c.innerText.replace(/\n/g, ' | '))
    };
  });

  console.log('[TEST 2] Armed Knife Threat Evaluation:', JSON.stringify(knifeEvaluation, null, 2));

  // Dismiss emergency modal if open so full dashboard is shown in screenshot
  await page.evaluate(() => {
    const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Close View') || b.innerText.includes('✕'));
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Take screenshot of knife threat state
  const screenshotPath = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/two_persons_and_knife_verification.png';
  await page.screenshot({ path: screenshotPath });
  console.log(`[TEST] ✓ Verification screenshot saved to ${screenshotPath}`);

  await browser.close();
}

run().catch(err => {
  console.error('[TEST ERROR]', err);
  process.exit(1);
});
