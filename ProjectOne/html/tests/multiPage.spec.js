import { test, expect } from "@playwright/test";

test('Open Gmail in New Tab', async ({ page, context }) => {
    
    await page.goto('https://www.google.com/');

    // 2. Setup the listener BEFORE the action
    const pagePromise = context.waitForEvent('page');

    // 3. Click with 'Control' (Windows standard for new tab)
    await page.getByRole('link', { name: 'Gmail' }).click({ modifiers: ['Control'] });

    // 4. Assign the new tab to a variable and wait for it to load (avoid if internet speed is slow)
    const page2 = await pagePromise;
    //await page2.waitForLoadState();

    // 5. Assertion: Verify the new tab opened correctly
    await expect(page2).toHaveTitle(/Gmail/);
});