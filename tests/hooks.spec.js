const { test, expect } = require('@playwright/test');

test.describe('Hooks Demo', () => {

  // 1️⃣ Sabse Pehle (Sirf Ek Baar)
  test.beforeAll(async () => {
    console.log('beforeAll: Database Connected / Server Started');
  });

  // 2️⃣ Har Test Se Pehle
  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Opened URL & Logged In');
    await page.goto('https://example.com');
  });

  // --- TEST 1 ---
  test('Check Title', async ({ page }) => {
    console.log('Running Test 1: Checking Page Title...');
    await expect(page).toHaveTitle(/Example/);
  });

  // --- TEST 2 ---
  test('Check Heading', async ({ page }) => {
    console.log(' Running Test 2: Checking H1 Tag...');
    await expect(page.locator('h1')).toBeVisible();
  });

  // 3️⃣ Har Test Ke Baad
  test.afterEach(async () => {
    console.log(' afterEach: Cleared Cookies / Took Screenshot');
  });

  // 4️⃣ Sabse Aakhri Mein (Sirf Ek Baar)
  test.afterAll(async () => {
    console.log(' afterAll: Database Closed / Report Generated');
  });

});
