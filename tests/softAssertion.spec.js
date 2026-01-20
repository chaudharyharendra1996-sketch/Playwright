const { test, expect } = require('@playwright/test');

test('Soft and Negated Assertions Demo', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  const checkbox1 = page.locator('input[type="checkbox"]').first(); // Unchecked by default
  const checkbox2 = page.locator('input[type="checkbox"]').nth(1);  // Checked by default

  // 1️⃣ NEGATED ASSERTION (Ulta Check)
  // Verify Checkbox 1 is NOT checked
  await expect(checkbox1).not.toBeChecked();
  console.log('✅ Negated Assertion Passed: Checkbox 1 is indeed empty.');

  // 2️⃣ SOFT ASSERTION (Galti Maaf, Aage Badho)
  // We will intentionally fail this check.
  // We assert that Checkbox 1 IS checked (which is false).
  // A normal 'expect' would crash the test here. 'expect.soft' continues.
  console.log('...Running Soft Assertion 1 (Will Fail but continue)...');
  await expect.soft(checkbox1).toBeChecked(); 

  // Test did NOT stop here! 👇
  
  console.log('...Running Soft Assertion 2 (Will Pass)...');
  await expect.soft(checkbox2).toBeChecked(); 

  // 3️⃣ Manual Check of Soft Failures
  // You can check if any soft assertions failed during the test
  if (test.info().errors.length > 0) {
      console.log(`⚠️ Warning: We found ${test.info().errors.length} soft failures!`);
  }
});