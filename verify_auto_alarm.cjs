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

  // Monitor console logs for automated detection and audio playback
  const logs = [];
  page.on('console', msg => logs.push(msg.text()));

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 2000));

  // Simulate a live camera frame receiving the pen without any button clicks
  const result = await page.evaluate(async () => {
    const { soundFx } = await import('/src/utils/audio.js');
    const { analyzeLiveFrame } = await import('/src/utils/visionDetector.js');

    // Spy on soundFx.playAlarmClock
    let alarmClockCallCount = 0;
    let alarmDurationParam = null;
    const originalPlayAlarm = soundFx.playAlarmClock.bind(soundFx);
    soundFx.playAlarmClock = function(dur) {
      alarmClockCallCount++;
      alarmDurationParam = dur;
      return originalPlayAlarm(dur);
    };

    // Load pen sample into canvas as if from live webcam
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

    // Run frame analysis (same function called every 400ms by webcam loop)
    const analysis = await analyzeLiveFrame({
      videoElement: null,
      canvasElement: c,
      overlayCanvasElement: null,
      frameSeq: 101,
      timestamp: new Date().toISOString()
    });

    return {
      analysis: {
        isPenWeapon: analysis.isPenWeapon,
        detectedObject: analysis.detectedObject,
        detectedObjectLabel: analysis.detectedObjectLabel,
        score: analysis.score,
        status: analysis.status,
        hasWeapons: analysis.weaponPredictions.length > 0
      }
    };
  });

  console.log('Automated Live Camera Pen Analysis Result:\n', JSON.stringify(result, null, 2));

  // Verify that AudioContext plays without user gesture
  const audioContextState = await page.evaluate(async () => {
    const { soundFx } = await import('/src/utils/audio.js');
    soundFx.init();
    soundFx.playAlarmClock(3.0);
    return {
      state: soundFx.ctx?.state,
      sampleRate: soundFx.ctx?.sampleRate
    };
  });

  console.log('AudioContext State on automatic trigger:', JSON.stringify(audioContextState, null, 2));

  // Take screenshot of running system
  const screenshot = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/automatic_pen_detection_and_alarm.png';
  await page.screenshot({ path: screenshot });
  console.log('Saved screenshot:', screenshot);

  await browser.close();
}

test().catch(console.error);
