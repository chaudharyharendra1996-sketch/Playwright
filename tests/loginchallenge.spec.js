const { test, expect } = require('@playwright/test');

test('Practice Challenge: Login to Sauce Demo', async ({ page }) => {
  // 1. Go to the website
  await page.goto('https://www.saucedemo.com/');

  // 2. Fill in Username (Using Placeholder)
  // We found <input placeholder="Username" ... />
  await page.getByPlaceholder('Username').fill('standard_user');

  // 3. Fill in Password (Using ID)
  // We found <input id="password" ... />
  await page.locator('#password').fill('secret_sauce');

  // 4. Click Login (Using Role)
  // We found <input type="submit" value="Login" />
  // Playwright is smart enough to know input[type="submit"] acts like a button
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. Verify we are in (Check the URL or the title)
  await expect(page).toHaveURL(/inventory.html/);
});