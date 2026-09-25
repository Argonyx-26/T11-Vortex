const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function test() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 2000));

  // 1. Test soundFx.playAlarmClock(3.0) directly in browser context
  const audioResult = await page.evaluate(async () => {
    const { soundFx } = await import('/src/utils/audio.js');
    soundFx.init();
    const hasCtx = Boolean(soundFx.ctx);
    const state = soundFx.ctx?.state;

    // Trigger 3s alarm clock sound
    soundFx.playAlarmClock(3.0);

    return {
      hasCtx,
      state,
      muted: soundFx.muted,
      isFunction: typeof soundFx.playAlarmClock === 'function'
    };
  });

  console.log('AudioContext Alarm Clock verification:', JSON.stringify(audioResult, null, 2));

  // 2. Click '⚠️ Test Knife / Pen Alert' button
  const buttons = await page.$$('button');
  let testBtn = null;
  for (const b of buttons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text.includes('Test Knife / Pen Alert')) {
      testBtn = b;
      break;
    }
  }

  if (testBtn) {
    console.log('Triggering Test Knife / Pen Alert with 3s Alarm Clock sound...');
    await testBtn.click();
    await new Promise(r => setTimeout(r, 2000));

    // 3. Take screenshot of modal with Alarm (3s) badge
    const screenshot = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/pen_knife_detected_with_alarm_sound.png';
    await page.screenshot({ path: screenshot });
    console.log('Saved screenshot:', screenshot);
  }

  // 4. Test live camera pen detection returning isPenWeapon
  const penTestResult = await page.evaluate(async () => {
    const { detectPenWeaponInCanvas } = await import('/src/utils/visionDetector.js');
    const img = new Image();
    await new Promise(res => {
      img.onload = res;
      img.src = '/pen_sample.jpg';
    });
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const penResult = detectPenWeaponInCanvas(c);
    return penResult;
  });

  console.log('Pen Detector check:', JSON.stringify(penTestResult, null, 2));

  await browser.close();
}

test().catch(console.error);
