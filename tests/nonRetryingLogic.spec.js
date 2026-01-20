const { test, expect } = require('@playwright/test');

test('Scenario 3: Conditional Logic (Good Use Case)', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/entry_ad');

  // This is a "Modal" that appears sometimes
  const modal = page.locator('.modal');
  const closeBtn = page.locator('.modal-footer p');

  // ⚡ NON-RETRYING CHECK
  // We check INSTANTLY if the modal is there.
  // We do NOT want to fail the test if it's missing, we just skip the close step.
  if (await modal.isVisible()) {
      console.log('📢 Modal detected! Closing it...');
      await closeBtn.click();
  } else {
      console.log('🤷 No modal found. Continuing test...');
  }

  // Final Verification (Auto-Retry)
  await expect(page.locator('#content')).toBeVisible();
});
