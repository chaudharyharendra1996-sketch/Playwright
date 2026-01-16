import { test, expect } from '@playwright/test';

test('Manage All Alerts', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // --- 1. Handling Simple Alert ---
  // We use 'once' instead of 'on' so this listener runs only ONE time
  page.once('dialog', async dialog => {
    console.log('Alert says: ' + dialog.message());
    await dialog.accept();
  });
  await page.waitForTimeout(2000);
  await page.locator('#alertBtn').click();

  // --- 2. Handling Confirm Alert (Clicking Cancel) ---
  page.once('dialog', async dialog => {
    console.log('Confirm says: ' + dialog.message());
    await dialog.dismiss();                                                                          // Click Cancel
  });
  await page.waitForTimeout(2000);
  await page.locator('#confirmBtn').click();

  // Verify result on page
  await expect(page.getByText('You pressed Cancel!')).toBeVisible();

  // --- 3. Handling Prompt Alert (Typing Name) ---
  page.once('dialog', async dialog => {
    console.log('Prompt says: ' + dialog.message());
    await dialog.accept('Harendra Singh');                                               // Type Name + OK
  });
  await page.waitForTimeout(2000);
  await page.locator('#promptBtn').click();

  // Verify result on page
  await expect(page.getByText('Hello Harendra Singh!')).toBeVisible();

  await page.waitForTimeout(3000);
});

                                                    