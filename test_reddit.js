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
    await page.goto('https://www.reddit.com/r/generative/', { timeout: 20000, waitUntil: 'networkidle2' });
    await page.waitForSelector('shreddit-feed', { timeout: 10000 }).catch(() => null);
    const title = await page.title();
    const posts = await page.$$eval('shreddit-post', p => p.length).catch(() => 0);
    console.log('Title:', title);
    console.log('Posts found:', posts);
    if (posts > 0) {
      const firstPost = await page.$eval('shreddit-post', el => el.getAttribute('post-title')).catch(() => 'n/a');
      console.log('First post:', firstPost);
    }
  } catch(e) {
    console.log('ERROR:', e.message);
  }
  await browser.close();
})();
