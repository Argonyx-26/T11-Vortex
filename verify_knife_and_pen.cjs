const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function test() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 2000));

  // 1. Take screenshot of dashboard with enlarged camera & touch widgets
  const screenshot1 = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/dashboard_with_widgets_and_large_camera.png';
  await page.screenshot({ path: screenshot1 });
  console.log('Saved dashboard screenshot:', screenshot1);

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
    console.log('Clicking Test Knife / Pen Alert button...');
    await testBtn.click();
    await new Promise(r => setTimeout(r, 2500));

    // 3. Take screenshot of KnifeAlertModal
    const screenshot2 = 'C:/Users/sagar/.gemini/antigravity/brain/7bfb6917-9d6a-494e-bb15-2df24940b763/knife_pen_detected_popup_modal.png';
    await page.screenshot({ path: screenshot2 });
    console.log('Saved Knife Alert Modal screenshot:', screenshot2);
  } else {
    console.warn('Test Knife button not found');
  }

  // 4. Test pen detection algorithm directly on the page
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

  console.log('Live in-browser Pen Weapon Detector result:', JSON.stringify(penTestResult, null, 2));

  await browser.close();
}

test().catch(console.error);
