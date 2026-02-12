import { test, expect } from "@playwright/test";
test('Keyboard Events', async ({ page }) => {

    await page.goto('https://www.google.com');
    await page.waitForLoadState('load');

    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.click();
    //await searchbox.fill('Harendra Chaudhary',{delay: 100});
    await page.keyboard.type('Harendra Chaudhary', { delay: 100 });

    await page.keyboard.press("Control+A");
    await page.waitForTimeout(100);
    await page.keyboard.press("Control+C");
    await page.waitForTimeout(200);
    await page.keyboard.press("Backspace");
    await page.waitForTimeout(1000);
    await page.keyboard.press("Control+V");

}
)