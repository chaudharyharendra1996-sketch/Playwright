const { test, expect } = require('@playwright/test');

test('Auto-Retry Demo on Dynamic Loading Page', async ({ page }) => {
  
  // 1. Go to a page that simulates a slow loading element
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  // 2. Click the 'Start' button to begin the 5-second loading process
  await page.getByRole('button', { name: 'Start' }).click();

  // 3. Define the locator for the result text
  const finishText = page.locator('#finish h4');

  // ✅ AUTO-RETRY IN ACTION
  // The text "Hello World!" is NOT visible yet. It takes 5 seconds.
  // Playwright sees it's missing, waits 100ms, checks again... waits... checks...
  // Once the text appears (after 5s), this line passes instantly.
  await expect(finishText).toBeVisible();
  await expect(finishText).toHaveText('Hello World!');

  console.log('✅ Test Passed: Playwright waited automatically!');
  
/*   // ❌ THIS WOULD FAIL
await page.getByRole('button', { name: 'Start' }).click();

// This runs immediately (0.01s after click). 
// The text hasn't loaded yet, so it returns 'false' and your logic fails.
if (await page.locator('#finish h4').isVisible()) {
    console.log("Found it");
} else {
    console.log("Not found!"); // This will print
} */
});