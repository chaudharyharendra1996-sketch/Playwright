const { test, expect } = require('@playwright/test');

test('Scenario 2: The Flaky Test (Do not do this)', async ({ page }) => {
  // 1. Go to a page where elements load slowly
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

  // 2. Click Start to load the element (Takes 5 seconds)
  await page.getByRole('button', { name: 'Start' }).click();

  const finishText = page.locator('#finish h4');

  // ⚠️ DANGER: locator.isVisible() checks INSTANTLY
  // Since the text takes 5 seconds to load, this line runs at 0.1s
  // It returns 'false' immediately.
  const isVisible = await finishText.isVisible();

  // This assertion fails because 'isVisible' is false
  // expect(false).toBe(true) -> FAIL
  expect(isVisible).toBe(true); 
  
  // 💡 CORRECT WAY:
  // await expect(finishText).toBeVisible(); // This would wait 5 seconds
});