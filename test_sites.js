const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true, 
    args: ['--no-sandbox'],
    executablePath: '/home/ubuntu/.cache/puppeteer/chrome/linux-145.0.7632.67/chrome-linux64/chrome'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    await page.goto('https://www.artstation.com/', { timeout: 15000, waitUntil: 'networkidle2' });
    await page.waitForSelector('.gallery-grid', { timeout: 10000 }).catch(() => null);
    
    const title = await page.title();
    console.log('Title:', title);
    
    // Get some artwork thumbnails
    const artworks = await page.$$eval('.gallery-grid img', imgs => imgs.slice(0,5).map(img => ({ src: img.src, alt: img.alt })));
    console.log('Found', artworks.length, 'artworks');
    artworks.forEach((a, i) => console.log(`  ${i+1}. ${a.alt || 'untitled'}`));
  } catch(e) {
    console.log('ERROR:', e.message.split('\n')[0]);
  }
  await browser.close();
})();
