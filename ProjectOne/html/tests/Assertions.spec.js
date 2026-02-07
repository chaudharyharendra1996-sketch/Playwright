import { test, expect } from '@playwright/test';

test('Assertion', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/ProjectOne/html/assertion.html');

    await expect(page.locator('#heading')).toHaveText('Welcome to Playwright!');
    await page.waitForTimeout(200);

    await expect(page.locator('#username')).toHaveValue('test_user');
    await page.waitForTimeout(200);

    await expect(page.locator('#submitBtn')).toBeEnabled();
    await page.waitForTimeout(200);

    await expect(page.locator('#agreeTerms')).toBeChecked();
    await page.waitForTimeout(200);

    await expect(page.locator('#disabledBtn')).toBeDisabled();
    await page.waitForTimeout(200);
     await expect(page.locator('#disabledBtn')).toHaveText('Can\'t Click');

    await expect(page.locator('#disabledBtn')).toBeDisabled();
    await page.waitForTimeout(200);

    await expect(page.locator('#hiddenPara')).toBeHidden();
    await page.waitForTimeout(200);

})


