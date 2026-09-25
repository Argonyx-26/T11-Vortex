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
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile(path.join(distDir, 'index.html'), (err2, fallback) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function runVerification() {
  // Start backend server
  const backendProc = spawn('node', [path.join(__dirname, 'backend', 'server.js')], {
    stdio: 'pipe'
  });
  backendProc.stdout.on('data', d => console.log(`[Backend stdout]: ${d.toString().trim()}`));
  backendProc.stderr.on('data', d => console.error(`[Backend stderr]: ${d.toString().trim()}`));

  const PORT = 4175;
  await new Promise(r => server.listen(PORT, r));
  console.log(`Test frontend running at http://localhost:${PORT}`);

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

  console.log('Opening Vortex dashboard...');
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  // 1. ENROLLMENT FLOW: Register Face 1 (Sanidhya)
  console.log('\n--- Step 1: Registering Face 1 (Sanidhya) ---');
  const registerBtn = await page.$('button[title*="Enroll New Face"]');
  if (!registerBtn) throw new Error('Register button not found in header');
  await registerBtn.click();
  await new Promise(r => setTimeout(r, 600));

  // Fill in form: Name = "Sanidhya", Role = "Sensor Fusion Engineer"
  await page.type('input[placeholder*="Sanidhya"]', 'Sanidhya');
  await page.type('input[placeholder*="Sensor Fusion"]', 'Sensor Fusion Engineer');

  // Click Submit / Capture
  const captureBtn = await page.$('button[type="submit"]');
  await captureBtn.click();

  // Wait for 3-frame capture burst and success banner
  await page.waitForSelector('#enrollment-success-banner', { timeout: 8000 });
  const successText1 = await page.$eval('#enrollment-success-banner', el => el.innerText);
  console.log(`[Success Banner 1]: ${successText1.replace(/\n/g, ' ')}`);
  if (!successText1.toLowerCase().includes('sanidhya registered as authorized')) {
    throw new Error('Success message did not include expected confirmation!');
  }
  await page.screenshot({ path: path.join(__dirname, 'verify_registered_sanidhya.png') });

  // Close modal
  const doneBtn = await page.$('button.bg-emerald-500');
  if (doneBtn) await doneBtn.click();
  await new Promise(r => setTimeout(r, 500));

  // 2. ENROLLMENT FLOW: Register Face 2 (Marcus Thorne)
  console.log('\n--- Step 2: Registering Face 2 (Marcus Thorne) ---');
  await registerBtn.click();
  await new Promise(r => setTimeout(r, 600));

  await page.type('input[placeholder*="Sanidhya"]', 'Marcus Thorne');
  await page.type('input[placeholder*="Sensor Fusion"]', 'Contractor Specialist');

  const captureBtn2 = await page.$('button[type="submit"]');
  await captureBtn2.click();

  await page.waitForSelector('#enrollment-success-banner', { timeout: 8000 });
  const successText2 = await page.$eval('#enrollment-success-banner', el => el.innerText);
  console.log(`[Success Banner 2]: ${successText2.replace(/\n/g, ' ')}`);
  if (!successText2.toLowerCase().includes('marcus thorne registered as authorized')) {
    throw new Error('Success message did not include expected confirmation for Marcus Thorne!');
  }
  await page.screenshot({ path: path.join(__dirname, 'verify_registered_marcus.png') });

  const doneBtn2 = await page.$('button.bg-emerald-500');
  if (doneBtn2) await doneBtn2.click();
  await new Promise(r => setTimeout(r, 500));

  // 3. TEST CASE A: Authorized Person holding Knife (Blade Exposed)
  console.log('\n--- Step 3: Test Case A (Authorized Person + Knife) ---');
  await page.evaluate(() => {
    const btnCaseA = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Case A: Authorized + Knife'));
    if (btnCaseA) btnCaseA.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const caseAMetrics = await page.evaluate(() => {
    const scoreText = document.querySelector('.text-4xl.font-black')?.innerText;
    const statusText = document.querySelector('.text-4xl')?.parentElement?.querySelector('.rounded-full')?.innerText;
    const reasoning = Array.from(document.querySelectorAll('.space-y-2\\.5 .text-xs')).map(e => e.innerText.replace(/\n/g, ' '));
    return { score: parseInt(scoreText), status: statusText, reasoning };
  });

  console.log(`[Case A Results]: Score = ${caseAMetrics.score}, Status = ${caseAMetrics.status}`);
  console.log(`[Case A Reasoning sample]:`, caseAMetrics.reasoning.slice(0, 3));

  if (caseAMetrics.score !== 60) {
    throw new Error(`Expected Score 60 for Authorized + Knife, got ${caseAMetrics.score}`);
  }
  if (!caseAMetrics.status.includes('SUSPICIOUS')) {
    throw new Error(`Expected Status SUSPICIOUS for Score 60, got ${caseAMetrics.status}`);
  }
  await page.screenshot({ path: path.join(__dirname, 'verify_authorized_knife_60.png') });

  // 4. TEST CASE B: Unauthorized Person holding Small Sharp Object (Scissors)
  console.log('\n--- Step 4: Test Case B (Unauthorized Person + Small Sharp Object) ---');
  await page.evaluate(() => {
    const btnCaseB = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Case B: Unauthorized + Scissors'));
    if (btnCaseB) btnCaseB.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const caseBMetrics = await page.evaluate(() => {
    const scoreText = document.querySelector('.text-4xl.font-black')?.innerText;
    const statusText = document.querySelector('.text-4xl')?.parentElement?.querySelector('.rounded-full')?.innerText;
    const reasoning = Array.from(document.querySelectorAll('.space-y-2\\.5 .text-xs')).map(e => e.innerText.replace(/\n/g, ' '));
    return { score: parseInt(scoreText), status: statusText, reasoning };
  });

  console.log(`[Case B Results]: Score = ${caseBMetrics.score}, Status = ${caseBMetrics.status}`);
  console.log(`[Case B Reasoning sample]:`, caseBMetrics.reasoning.slice(0, 3));

  if (caseBMetrics.score !== 25) {
    throw new Error(`Expected Score 25 for Unauthorized + Scissors, got ${caseBMetrics.score}`);
  }
  if (!caseBMetrics.status.includes('NORMAL')) {
    throw new Error(`Expected Status NORMAL for Score 25, got ${caseBMetrics.status}`);
  }
  await page.screenshot({ path: path.join(__dirname, 'verify_unauthorized_scissors_25.png') });

  // 5. COMPARISON VERIFICATION
  console.log('\n--- Step 5: Comparative Fusion Scoring Verification ---');
  console.log(`Case A (Authorized + Knife): Score ${caseAMetrics.score} (SUSPICIOUS)`);
  console.log(`Case B (Unauthorized + Scissors): Score ${caseBMetrics.score} (NORMAL)`);
  console.log(`Score Difference: ${caseAMetrics.score - caseBMetrics.score} points`);

  if (caseAMetrics.score <= caseBMetrics.score) {
    throw new Error('Object danger did NOT outweigh identity status!');
  }
  console.log('✓ SUCCESS: Authorized person with knife decisively outscores unauthorized person with small sharp item (+35 points higher)!');

  console.log(`\nTotal Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors found:', consoleErrors);
  } else {
    console.log('✓ ZERO console errors confirmed!');
  }

  await browser.close();
  server.close();
  backendProc.kill();
  console.log('All verification checks passed successfully!');
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
