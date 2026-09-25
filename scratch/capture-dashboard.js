import puppeteer from 'puppeteer-core';

async function captureDashboard() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Trigger knife test
  await page.keyboard.press('KeyK');
  await new Promise(r => setTimeout(r, 800));

  // Click "Close View" on modal so we see the full dashboard with knife threat active
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Close View') || b.textContent.includes('Dismiss'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: 'verify_knife_dashboard_active.png' });
  console.log('Saved verify_knife_dashboard_active.png');

  await browser.close();
}

captureDashboard().catch(console.error);
