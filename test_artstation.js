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
    await page.goto('https://www.artstation.com/cryloop/likes', { timeout: 30000 });
    
    // Scroll to load content
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 1000));
      await new Promise(r => setTimeout(r, 1000));
    }
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Get all project images
    const artworks = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => img.src.includes('artstation.com/p/assets') || img.src.includes('artstation.com/p/users'))
        .slice(0, 30)
        .map(img => {
          // Try to find title from nearby elements
          let title = 'untitled';
          const parent = img.closest('[class*="card"], [class*="project"], article, a');
          if (parent) {
            const titleEl = parent.querySelector('h3, h4, [class*="title"]');
            if (titleEl) title = titleEl.innerText.trim();
          }
          return { src: img.src, title };
        });
    });
    
    console.log('=== Your ArtStation Likes ===\n');
    artworks.slice(0, 20).forEach((a, i) => console.log(`${i+1}. ${a.title}`));
    console.log(`\nTotal artworks found: ${artworks.length}`);
    
  } catch(e) {
    console.log('ERROR:', e.message.split('\n')[0]);
  }
  await browser.close();
})();
