import { test, expect } from '@playwright/test';

test('New Locator', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/ProjectOne/html/tests/new.html');


    await page.locator('[name="email"]').fill('playwright@test.com');
    await page.locator('[name="password"]').fill('secure123');


    await page.getByRole('button', { name: 'Login' }).click();
    console.log('Login has clicked');

    await expect(page.locator('#message')).toHaveText("Login successful");
    
    await page.waitForTimeout(2000); 
});
