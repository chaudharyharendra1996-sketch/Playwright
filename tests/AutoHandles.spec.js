import { test, expect } from '@playwright/test';

test('Auto-Suggestion Handling', async ({ page }) => {

    // 1. Go to the website
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // 2. Locate the input box and type 'Ind'
    await page.locator("#autocomplete").fill('Ind');

    // 3. WAIT for the suggestions to appear
    // This is crucial: We wait for at least one option to be visible
    await page.locator('.ui-menu-item').first().waitFor();

    // 4. Click the exact text "India" from the list
    // Best Practice: Chain the locator to search strictly inside the menu items
    // 4. Click the exact text "India" from the list
    // 4. Click the exact text "India" using { exact: true }
    // This works too, because Playwright finds the text inside the parent anyway
    await page.locator('.ui-menu-item').getByText('India', { exact: true }).click();

    // 5. Verification: Check if the box now has 'India'
    await expect(page.locator('#autocomplete')).toHaveValue('India');

    // Pause to see the result (Remove this in final production code)
    await page.waitForTimeout(3000);
});