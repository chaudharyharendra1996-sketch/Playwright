 const {chromium } = require('playwright');
 
    (async ()=>{
        // Line 4 modification:
const browser = await chromium.launch({ headless: false, slowMo: 1000 });
 
        const context = await browser.newContext(); // isolated session
        const page = await context.newPage();
 
        await page.goto("https://google.com");
        await browser.close();  // entire browser instance, all contexts and pages
    } )();
