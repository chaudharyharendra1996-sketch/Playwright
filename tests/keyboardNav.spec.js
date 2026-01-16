import { test, expect } from '@playwright/test';

test('Auto-complete - Keyboard Navigation', async ({ page }) => {
    // 1. Go to the website
    await page.goto('https://www.google.com');

    // 1. Type slowly to mimic user (triggers dynamic fetch reliably)
    await page.locator('textarea[name="q"]').pressSequentially('Playwright', { delay: 100 });
    
    // Wait for suggestions to load
    await page.waitForTimeout(2000); 
    
    // 2. Press ArrowDown until you reach your target
    // (In a real test, you might verify the active element's text here)
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await page.waitForTimeout(1000); 

    // 3. Press Enter to select
    await page.keyboard.press('Enter');
});