const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Website open karo (Yahan apna URL daalein)
  await page.goto('http://127.0.0.1:5500/ProjectOne/html/pageOne.html');

  // 2. Page par jitne bhi <img> tags hain, sabko collect karo
  const allImages = await page.locator('img').all();
  
  console.log(`Total images found: ${allImages.length}`);

  // 3. Loop chala kar har image ko check karo
  for (const img of allImages) {
      
      // 'evaluate' browser ke andar ja kar check karta hai ki naturalWidth kya hai
      const isBroken = await img.evaluate(node => node.naturalWidth === 0);
      
      // Image ka src (URL) nikalo taaki pata chale kaunsi image kharab hai
      const src = await img.getAttribute('src');

      if (isBroken) {
          console.log(`❌ Broken Image Found: ${src}`);
      } else {
          console.log(`✅ Working Image: ${src}`);
      }
  }

  await browser.close();
})();