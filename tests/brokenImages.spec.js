// tests/brokenImages.spec.js
const { test, expect } = require('@playwright/test');

test('Find all broken images on the page', async ({ page }) => {
  // 1. Go to the page
  await page.goto('https://the-internet.herokuapp.com/broken_images'); // Example URL

  // 2. Get all image locators
  const allImages = await page.locator('img').all();
  console.log(`Total images found: ${allImages.length}`);

  // 3. Loop through each image to check status
  for (const img of allImages) {
    
    // Check if the image loaded by verifying its natural width
    // naturalWidth === 0 means the image is broken
    const isBroken = await img.evaluate(node => node.naturalWidth === 0);
    const src = await img.getAttribute('src');

    if (isBroken) {
      console.log(`❌ Broken Image: ${src}`);
      // Optional: Fail the test if broken images are found
      // expect(isBroken).toBeFalsy(); 
    } else {
      console.log(`✅ Working Image: ${src}`);
    }
  }
});