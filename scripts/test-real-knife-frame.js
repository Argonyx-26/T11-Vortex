import puppeteer from 'puppeteer-core';

async function testWithRealKnifeImage() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('[TEST-FRAME] Launching Edge...');

  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const testResult = await page.evaluate(async () => {
    const { initMediaPipeFaceDetector } = await import('/src/utils/mediaPipeFaceDetector.js');
    const { initVisionModel } = await import('/src/utils/visionDetectorCoco.js');

    const faceDetector = await initMediaPipeFaceDetector();
    const cocoModel = await initVisionModel();

    // Create a 640x480 canvas
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#f0e6d2';
    ctx.fillRect(0, 0, 640, 480);

    // Load an actual photo of a person holding a knife
    // Or load a real test knife image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    // Wikimedia Commons public domain / CC photo of a knife
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Kitchen_knife_2.jpg/640px-Kitchen_knife_2.jpg';

    let imgLoaded = false;
    try {
      await new Promise((res, rej) => {
        img.onload = () => { imgLoaded = true; res(); };
        img.onerror = (e) => { rej(new Error('Image failed to load')); };
        setTimeout(() => rej(new Error('Timeout loading knife test image')), 5000);
      });
    } catch (e) {
      console.warn('External image load failed:', e.message);
    }

    if (imgLoaded) {
      ctx.drawImage(img, 50, 50, 500, 300);
    } else {
      // Draw a synthetic knife shape: silver elongated blade + dark handle
      ctx.fillStyle = '#222';
      ctx.fillRect(100, 200, 100, 30); // handle
      ctx.fillStyle = '#bbb';
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(400, 210);
      ctx.lineTo(420, 215);
      ctx.lineTo(200, 230);
      ctx.closePath();
      ctx.fill();
    }

    // Now test COCO-SSD on this canvas directly
    const cocoCanvasPreds = await cocoModel.detect(canvas, 20, 0.1);

    // Also convert canvas to video stream and test
    const stream = canvas.captureStream(30);
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();
    await new Promise(r => setTimeout(r, 200));

    const cocoVideoPreds = await cocoModel.detect(video, 20, 0.1);

    return {
      imgLoaded,
      cocoCanvasPreds,
      cocoVideoPreds
    };
  });

  console.log('[TEST-FRAME RESULT]:\n', JSON.stringify(testResult, null, 2));

  await browser.close();
}

testWithRealKnifeImage().catch(err => {
  console.error('[TEST-FRAME FAILED]', err);
  process.exit(1);
});
