import puppeteer from 'puppeteer-core';

async function verifyAll() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[VERIFY-ALL] Launching Edge browser...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('MediaPipe') || text.includes('COCO') || text.includes('KNIFE') || text.includes('SCREENING')) {
      console.log(`[PAGE CONSOLE] ${text}`);
    }
  });

  console.log('[VERIFY-ALL] Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Check Initial State
  const initialInfo = await page.evaluate(() => {
    return {
      hasFaceAI: Boolean(document.querySelector('#mediapipe-status-badge')),
      hasTestKnifeBtn: Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('KNIFE')),
      hasWebcamFeed: Boolean(document.querySelector('#checkpoint-camera-feed'))
    };
  });
  console.log('[INITIAL STATE]:', initialInfo);

  // 2. Click "TEST KNIFE" button to verify knife detection and score boost for person holding knife
  console.log('[VERIFY-ALL] Triggering Knife Detection...');
  await page.keyboard.press('KeyK');

  await new Promise(r => setTimeout(r, 1000));

  const knifeState = await page.evaluate(() => {
    const scoreText = document.body.innerText;
    const hasCritical = scoreText.includes('CRITICAL');
    const hasKnifeDetected = scoreText.includes('KNIFE DETECTED');
    const hasEmergencyModal = document.body.innerText.includes('EMERGENCY PROTOCOL') || Boolean(document.querySelector('.bg-red-950'));
    const reasoning = document.querySelector('#reasoning-log, .font-mono')?.innerText || '';
    return {
      hasCritical,
      hasKnifeDetected,
      hasEmergencyModal,
      contains85: scoreText.includes('85') || scoreText.includes('85/100'),
      reasoningSnippet: reasoning.slice(0, 150)
    };
  });
  console.log('[KNIFE DETECTED STATE]:', knifeState);

  await page.screenshot({ path: 'verify_knife_score_escalated.png' });
  console.log('Saved verify_knife_score_escalated.png');

  // Dismiss modal if open
  const closeBtn = await page.$('button[title="Dismiss Alert"], button:has(svg.lucide-x)');
  if (closeBtn) {
    await closeBtn.click().catch(() => {});
    await new Promise(r => setTimeout(r, 500));
  }

  // Toggle knife back off
  const testKnifeBtnOff = await page.$('button[title*="Knife"], button:has-text("KNIFE ACTIVE")');
  if (testKnifeBtnOff) {
    await testKnifeBtnOff.click();
  } else {
    await page.keyboard.press('KeyK');
  }
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: 'verify_normal_face_in_frame.png' });
  console.log('Saved verify_normal_face_in_frame.png');

  await browser.close();
  console.log('[VERIFY-ALL] Complete!');
}

verifyAll().catch(err => {
  console.error('[VERIFY-ALL FAILED]', err);
  process.exit(1);
});
