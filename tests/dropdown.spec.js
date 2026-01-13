import { test, expect } from '@playwright/test';

test('Dropdown Handling', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 1. Single Select (Country) -> Selecting by visible Text
  // (Hum text 'Germany' padh ke select kar rahe hain)
  await page.locator('#country').selectOption({ label: 'Germany' });

  // 2. Multi Select (Colors) -> Selecting multiple items
  // (Hum Red aur Yellow dono ek saath select kar rahe hain)
  await page.locator('#colors').selectOption(['Red', 'Yellow']);

  // Check your work (Wait for 3 seconds)
  await page.waitForTimeout(3000);
});


/* import { test, expect } from '@playwright/test';

test('Dropdown Handling', async ({ page }) => {
  // 1. Go to the website
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // 2. Locate the dropdown (It has ID 'dropdown-class-example')
  const dropdown = page.locator('#dropdown-class-example');

  // 3. Select 'Option2' using the visible Label
  // (Hum text 'Option2' se select kar rahe hain)
  await dropdown.selectOption({ label: 'Option2' });

  // 4. Verify/Assert: Check if the value is now 'option2'
  // (Playwright checks the 'value' attribute, which is usually lowercase)
  await expect(dropdown).toHaveValue('option2');

  // Pause to see the selection
  await page.waitForTimeout(3000);
}); */