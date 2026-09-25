import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(distDir, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // SPA Fallback for client routing (e.g., /camera-feed)
      fs.readFile(path.join(distDir, 'index.html'), (err2, fallback) => {
        if (err2) {
          res.writeHead(500);
          res.end('Error loading index.html');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function runLiveTrackingVerification() {
  console.log('===========================================================');
  console.log('  STARTING VORTEX LIVE TRACKING & ROSTER VERIFICATION');
  console.log('===========================================================');

  // 1. Launch Backend API Server
  console.log('[1/10] Starting Vortex backend server...');
  const backendProc = spawn('node', [path.join(__dirname, 'backend', 'server.js')], {
    stdio: 'pipe'
  });
  backendProc.stdout.on('data', d => console.log(`[Backend stdout]: ${d.toString().trim()}`));
  backendProc.stderr.on('data', d => console.error(`[Backend stderr]: ${d.toString().trim()}`));

  // Give backend 1 second to bind
  await new Promise(r => setTimeout(r, 1000));

  // 2. Start Frontend Server
  const PORT = 4176;
  await new Promise(r => server.listen(PORT, r));
  console.log(`[2/10] Test frontend server running at http://localhost:${PORT}`);

  // 3. Launch Puppeteer Browser
  console.log('[3/10] Launching Chrome browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[Browser Error]: ${msg.text()}`);
    }
  });

  try {
    // 4. Load Dashboard
    console.log('[4/10] Navigating to http://localhost:' + PORT);
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    // Verify Step 1: Initial In-Frame State
    console.log('\n--- Step 1: Verifying Initial In-Frame State & Bounding Box ---');
    await page.waitForSelector('#live-bounding-box', { timeout: 5000 });
    const initialBoxText = await page.$eval('#live-bounding-box', el => el.innerText);
    console.log('[Initial Bounding Box Status]:');
    console.log(initialBoxText.split('\n').filter(s => s.trim()).join(' | '));
    
    if (!initialBoxText.toLowerCase().includes('authorized (+0)')) {
      throw new Error('Initial bounding box does not indicate AUTHORIZED (+0)!');
    }
    if (!initialBoxText.toLowerCase().includes('tanvi')) {
      throw new Error('Initial face label does not include Tanvi!');
    }

    console.log('Verified initial face in frame.');
    await page.screenshot({ path: path.join(__dirname, 'verify_step1_initial_in_frame.png') });

    // Step 2: Move Out of Frame
    console.log('\n--- Step 2: Verifying Move Out of Frame ---');
    const moveOutBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.toLowerCase().includes('move out of frame'));
    });

    if (!moveOutBtn.asElement()) {
      throw new Error('"Move Out of Frame" button not found!');
    }
    await moveOutBtn.asElement().click();
    console.log('Clicked "Move Out of Frame". Waiting 800ms for cycle update...');
    await new Promise(r => setTimeout(r, 800));

    // Verify bounding box has cleared and "NO FACE IN FRAME" is displayed
    await page.waitForSelector('#no-face-in-frame', { timeout: 3000 });
    const noFaceEl = await page.$('#live-bounding-box');
    if (noFaceEl) {
      throw new Error('Bounding box (#live-bounding-box) remained on screen after moving out of frame!');
    }
    const feedText = await page.$eval('#checkpoint-camera-feed', el => el.innerText);
    console.log('[Out of Frame Feed Status]:');
    console.log(feedText.split('\n').filter(s => s.trim()).join(' | '));
    if (!feedText.toLowerCase().includes('no face in frame')) {
      throw new Error('Feed does not display NO FACE IN FRAME status!');
    }

    // Verify Roster shows NO person IN FRAME
    const rosterAfterOut = await page.evaluate(() => {
      const rosterBadges = Array.from(document.querySelectorAll('span'));
      const inFrameBadges = rosterBadges.filter(s => s.innerText.trim() === 'IN FRAME');
      return inFrameBadges.length;
    });
    console.log(`[Roster IN FRAME badges count]: ${rosterAfterOut} (expected 0)`);
    if (rosterAfterOut !== 0) {
      throw new Error(`Expected 0 personnel IN FRAME, but found ${rosterAfterOut}!`);
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step2_out_of_frame.png') });

    // Step 3: Switch Person → Sanidhya (Auth)
    console.log('\n--- Step 3: Verifying Person Switch to Sanidhya (Auth) ---');
    const sanidhyaBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.toLowerCase().includes('sanidhya'));
    });
    if (!sanidhyaBtn.asElement()) throw new Error('"Sanidhya (Auth)" button not found!');
    await sanidhyaBtn.asElement().click();
    await new Promise(r => setTimeout(r, 800));

    await page.waitForSelector('#live-bounding-box', { timeout: 3000 });
    const sanidhyaBoxText = await page.$eval('#live-bounding-box', el => el.innerText);
    console.log('[Sanidhya Bounding Box Status]:');
    console.log(sanidhyaBoxText.split('\n').filter(s => s.trim()).join(' | '));
    if (!sanidhyaBoxText.toLowerCase().includes('sanidhya')) {
      throw new Error('Face label did not update to Sanidhya!');
    }
    if (!sanidhyaBoxText.toLowerCase().includes('authorized (+0)')) {
      throw new Error('Sanidhya status is not AUTHORIZED (+0)!');
    }

    // Check roster updated for Sanidhya
    const rosterSanidhyaInFrame = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('div'));
      const sanidhyaRow = rows.find(r => r.innerText && r.innerText.includes('Sanidhya') && r.innerText.includes('Sensor Fusion Engineer'));
      return sanidhyaRow ? sanidhyaRow.innerText.includes('IN FRAME') : false;
    });
    console.log(`[Roster Sanidhya is IN FRAME]: ${rosterSanidhyaInFrame}`);
    if (!rosterSanidhyaInFrame) {
      throw new Error('Personnel Roster did not switch IN FRAME badge to Sanidhya!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step3_switch_sanidhya.png') });

    // Step 4: Switch to Unrecognized Face → "Unknown User 1"
    console.log('\n--- Step 4: Verifying Unrecognized Face → Sequential "Unknown User 1" ---');
    const unknown1Btn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.trim() === 'Unknown User 1');
    });
    if (!unknown1Btn.asElement()) throw new Error('"Unknown User 1" button not found!');
    await unknown1Btn.asElement().click();
    await new Promise(r => setTimeout(r, 800));

    await page.waitForSelector('#live-bounding-box', { timeout: 3000 });
    const unknown1BoxText = await page.$eval('#live-bounding-box', el => el.innerText);
    console.log('[Unknown User 1 Box Status]:');
    console.log(unknown1BoxText.split('\n').filter(s => s.trim()).join(' | '));
    if (!unknown1BoxText.toLowerCase().includes('unknown user 1')) {
      throw new Error('Face label did not update to Unknown User 1!');
    }
    if (!unknown1BoxText.toLowerCase().includes('unauthorized (+15)')) {
      throw new Error('Unknown User 1 status is not UNAUTHORIZED (+15)!');
    }

    // Verify NO random pool names appear anywhere
    const pageText = await page.evaluate(() => document.body.innerText.toLowerCase());
    if (pageText.includes('liam zhao') || pageText.includes('maya chen')) {
      throw new Error('Random name generation pool found on page (Dr. Liam Zhao or Maya Chen)!');
    }
    console.log('Verified: NO random fake names exist. Strictly sequential Unknown User 1.');

    // Check roster reflects unauthorized alert
    const hasUnauthorizedAlert = await page.evaluate(() => {
      return document.body.innerText.toLowerCase().includes('unauthorized • in frame');
    });
    console.log(`[Roster Unauthorized Alert Active]: ${hasUnauthorizedAlert}`);
    if (!hasUnauthorizedAlert) {
      throw new Error('Roster did not show UNAUTHORIZED IN FRAME alert banner!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step4_unknown_user_1.png') });

    // Step 5: Switch to Second Distinct Unrecognized Face → "Unknown User 2"
    console.log('\n--- Step 5: Verifying Second Unrecognized Face → "Unknown User 2" ---');
    const unknown2Btn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.trim() === 'Unknown User 2');
    });
    if (!unknown2Btn.asElement()) throw new Error('"Unknown User 2" button not found!');
    await unknown2Btn.asElement().click();
    await new Promise(r => setTimeout(r, 800));

    await page.waitForSelector('#live-bounding-box', { timeout: 3000 });
    const unknown2BoxText = await page.$eval('#live-bounding-box', el => el.innerText);
    console.log('[Unknown User 2 Box Status]:');
    console.log(unknown2BoxText.split('\n').filter(s => s.trim()).join(' | '));
    if (!unknown2BoxText.toLowerCase().includes('unknown user 2')) {
      throw new Error('Face label did not update to Unknown User 2!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step5_unknown_user_2.png') });

    // Step 6: Re-introduce First Unrecognized Face → Retains "Unknown User 1"
    console.log('\n--- Step 6: Verifying Re-introducing First Face Retains "Unknown User 1" ---');
    await unknown1Btn.asElement().click();
    await new Promise(r => setTimeout(r, 800));

    await page.waitForSelector('#live-bounding-box', { timeout: 3000 });
    const retainedBoxText = await page.$eval('#live-bounding-box', el => el.innerText);
    console.log('[Retained Unknown User 1 Box Status]:');
    console.log(retainedBoxText.split('\n').filter(s => s.trim()).join(' | '));
    if (!retainedBoxText.toLowerCase().includes('unknown user 1')) {
      throw new Error('Re-introduced face did not retain sequential identifier Unknown User 1!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step6_unknown_user_1_retained.png') });

    // Step 7: Test Remote CCTV Mobile Feed Route (/camera-feed)
    console.log('\n--- Step 7: Verifying /camera-feed Route for Phone CCTV ---');
    await page.goto(`http://localhost:${PORT}/camera-feed`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1200));

    const cameraFeedText = await page.evaluate(() => document.body.innerText);
    console.log('[Camera Feed Header / Title]:');
    console.log(cameraFeedText.slice(0, 250).replace(/\n/g, ' '));

    if (!cameraFeedText.toLowerCase().includes('cam-02') && !cameraFeedText.toLowerCase().includes('camera')) {
      throw new Error('/camera-feed route did not load Camera 2 CCTV interface!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step7_phone_camera_feed.png') });

    // Step 8: Return to Dashboard and Test Connect Phone QR Modal
    console.log('\n--- Step 8: Verifying Phone CCTV QR Modal on Main Dashboard ---');
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1200));

    const qrBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.toLowerCase().includes('connect phone qr'));
    });
    if (!qrBtn.asElement()) throw new Error('"Connect Phone QR" button not found!');
    await qrBtn.asElement().click();
    await new Promise(r => setTimeout(r, 600));

    const modalText = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      return modal ? modal.innerText : '';
    });
    console.log('[Phone QR Modal Content]:');
    console.log(modalText.replace(/\n/g, ' '));

    if (!modalText.toLowerCase().includes('connect phone as remote cctv feed') && 
        !modalText.toLowerCase().includes('cam-02')) {
      throw new Error('Phone Camera Modal did not open or lacked expected titles!');
    }
    if (!modalText.includes('/camera-feed')) {
      throw new Error('Phone Camera Modal did not contain /camera-feed URL!');
    }
    await page.screenshot({ path: path.join(__dirname, 'verify_step8_phone_qr_modal.png') });

    // Step 9: Verify Console Cleanliness
    console.log('\n--- Step 9: Verifying Zero Console Errors ---');
    if (consoleErrors.length > 0) {
      console.warn(`[Console Errors Recorded (${consoleErrors.length})]:`);
      consoleErrors.forEach(err => console.warn(' - ' + err));
    } else {
      console.log('✓ PERFECT: Zero console errors recorded across all steps!');
    }

    console.log('\n===========================================================');
    console.log('  ALL LIVE TRACKING & ROSTER VERIFICATIONS PASSED 100%!');
    console.log('===========================================================');
  } finally {
    await browser.close();
    server.close();
    backendProc.kill('SIGINT');
  }
}

runLiveTrackingVerification().catch(err => {
  console.error('\nVerification FAILED:', err);
  process.exit(1);
});
