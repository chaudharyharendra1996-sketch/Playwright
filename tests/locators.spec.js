const { test, expect } = require('@playwright/test');

test('Login test with Locators', async ({ page }) => {
  // 1. Navigate to a demo login page
  await page.goto('https://www.saucedemo.com/');

  // --- LOCATORS IN ACTION ---

  // 2. By Placeholder: Great for input fields
  // Finds the input that has "Username" gray text inside it
  await page.getByPlaceholder('Username').fill('standard_user');

  // 3. By Locator (CSS Selector): Good for specific IDs
  // Finds the element with id="password"
  await page.locator('#password').fill('secret_sauce');

  // 4. By Role: BEST PRACTICE for buttons and links
  // Finds a button that explicitly says "Login"
  await page.getByRole('button', { name: 'Login' }).click();

  // --- ASSERTION (CHECK) ---
  
  // Check if we were redirected to the inventory page
  // We check if the URL contains "inventory.html"
  await expect(page).toHaveURL(/inventory.html/);
});