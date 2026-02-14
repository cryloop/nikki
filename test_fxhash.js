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
    await page.goto('https://www.fxhash.xyz/generative', { timeout: 20000, waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    const title = await page.title();
    console.log('Title:', title);
    
    // Get generative art thumbnails
    const artworks = await page.$$eval('img[class*="preview"]', imgs => imgs.slice(0,5).map(img => img.src));
    console.log('Found', artworks.length, 'artworks');
    artworks.forEach((src, i) => console.log(`  ${i+1}. ${src.substring(0,80)}...`));
  } catch(e) {
    console.log('ERROR:', e.message.split('\n')[0]);
  }
  await browser.close();
})();
