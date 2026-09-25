import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

// Simple static HTTP server for dist
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
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(distDir, 'index.html'), (err2, fallback) => {
          if (err2) {
            res.writeHead(500);
            res.end('Error loading index.html');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fallback);
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function runTest() {
  const PORT = 4173;
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running at http://localhost:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[Browser Console Error]: ${msg.text()}`);
    } else {
      console.log(`[Browser Console ${type}]: ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
    console.error(`[Browser Page Error]: ${err.toString()}`);
  });

  console.log('Navigating to Vortex dashboard...');
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  // 1. Check title & headers
  const pageTitle = await page.title();
  console.log(`Page Title: ${pageTitle}`);

  const headerText = await page.$eval('h1', el => el.innerText);
  console.log(`Header: ${headerText}`);

  // Check initial false alarms counter
  const initialFalseAlarms = await page.$eval('header', el => el.innerText);
  console.log(`Header content includes: ${initialFalseAlarms.includes('False Alarms Prevented')}`);

  // Screenshot initial state
  await page.screenshot({ path: path.join(__dirname, 'test_initial.png') });
  console.log('Saved test_initial.png');

  // 2. Click "Run Demo Scenario" button
  console.log('Triggering "Run Demo Scenario"...');
  const demoButton = await page.$('button[title*="Trigger automated 3-stage"]');
  if (!demoButton) {
    throw new Error('Demo button not found!');
  }
  await demoButton.click();

  // Helper to read current score and status
  const getMetrics = async () => {
    return await page.evaluate(() => {
      const scoreEl = document.querySelector('.text-5xl.font-black');
      const statusBadge = document.querySelector('.text-5xl')?.parentElement?.querySelector('.rounded-full');
      const dispatchItems = Array.from(document.querySelectorAll('.max-h-36 [class*="rounded-lg"]'))
        .map(el => el.innerText.replace(/\n/g, ' '));
      return {
        score: scoreEl ? scoreEl.innerText : null,
        status: statusBadge ? statusBadge.innerText : null,
        dispatchCount: dispatchItems.length,
        latestDispatch: dispatchItems[0] || null
      };
    });
  };

  // Wait for Step 1 completion (~3.5s)
  await new Promise(r => setTimeout(r, 3800));
  let metrics = await getMetrics();
  console.log(`[Stage 1 Check]: Score=${metrics.score}, Status=${metrics.status}, Dispatches=${metrics.dispatchCount}`);
  await page.screenshot({ path: path.join(__dirname, 'test_stage1.png') });

  // Wait for Step 2 completion (Suspicious around ~8.5s)
  await new Promise(r => setTimeout(r, 4500));
  metrics = await getMetrics();
  console.log(`[Stage 2 Check]: Score=${metrics.score}, Status=${metrics.status}, Dispatches=${metrics.dispatchCount}`);
  console.log(`Latest Dispatch: ${metrics.latestDispatch}`);
  await page.screenshot({ path: path.join(__dirname, 'test_stage2.png') });

  // Wait for Step 3 completion (Critical around ~15s)
  await new Promise(r => setTimeout(r, 6500));
  metrics = await getMetrics();
  console.log(`[Stage 3 Check]: Score=${metrics.score}, Status=${metrics.status}, Dispatches=${metrics.dispatchCount}`);
  console.log(`Latest Dispatch: ${metrics.latestDispatch}`);
  await page.screenshot({ path: path.join(__dirname, 'test_stage3_critical.png') });

  // Check if Emergency Modal popped up
  const emergencyModalVisible = await page.evaluate(() => {
    return document.querySelector('.fixed.inset-0.z-50') !== null;
  });
  console.log(`Emergency Modal Triggered: ${emergencyModalVisible}`);

  // Close emergency modal
  if (emergencyModalVisible) {
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.fixed.inset-0.z-50 button[title="Dismiss Alert"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
  }

  // 3. Test "The Insider Threat" modal
  console.log('Testing "The Insider Threat" feature...');
  const insiderBtn = await page.$('button[title*="Demonstrate: Verified Face"]');
  if (insiderBtn) {
    await insiderBtn.click();
    await new Promise(r => setTimeout(r, 500));

    // Click Step 2: Secondary Sensor Spike
    await page.evaluate(() => {
      const step2Btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('STEP 2'));
      if (step2Btn) step2Btn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Apply to Main Dashboard
    await page.evaluate(() => {
      const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Apply to Main Dashboard'));
      if (applyBtn) applyBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    metrics = await getMetrics();
    console.log(`[Insider Threat Applied Check]: Score=${metrics.score}, Status=${metrics.status}`);
    await page.screenshot({ path: path.join(__dirname, 'test_insider_threat.png') });
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Total Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors encountered:', consoleErrors);
  } else {
    console.log('✓ ZERO console errors confirmed!');
  }

  await browser.close();
  server.close();
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
