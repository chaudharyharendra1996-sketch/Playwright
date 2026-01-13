const { chromium } = require('playwright');

(async () => {
    // 1. Launch browser (headless: false lets you watch it happen briefly)
    const browser = await chromium.launch({ headless: false, slowMo: 1000 });
    
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log("Navigating to Google...");
    await page.goto("https://google.com");

    // 2. Take a Screenshot
    // This will create a file named 'google_proof.png' in your current folder
    await page.screenshot({ path: 'google_proof.png' });
    console.log("Screenshot saved as 'google_proof.png'");

    await browser.close();
})();