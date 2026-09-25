import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
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

async function capture() {
  const PORT = 4174;
  await new Promise(r => server.listen(PORT, r));

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

  // 1. Capture JSON tab
  await page.evaluate(() => {
    const jsonBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Sensor JSON Stream'));
    if (jsonBtn) jsonBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, 'view_json_stream.png') });

  // 2. Open Insider Threat modal and take screenshot of the modal dialog
  await page.evaluate(() => {
    const insiderBtn = document.querySelector('button[title*="Demonstrate: Verified Face"]');
    if (insiderBtn) insiderBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'view_insider_modal_step1.png') });

  // Click Step 2 inside modal
  await page.evaluate(() => {
    const step2Btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('STEP 2'));
    if (step2Btn) step2Btn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'view_insider_modal_step2.png') });

  // Apply to dashboard and dismiss emergency popup so we see the full critical control room
  await page.evaluate(() => {
    const applyBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Apply to Main Dashboard'));
    if (applyBtn) applyBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // Dismiss emergency popup
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0.z-50 button[title="Dismiss Alert"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'view_critical_dashboard.png') });

  await browser.close();
  server.close();
  console.log('Additional screenshots captured successfully!');
}

capture().catch(console.error);
