const { test, expect } = require('@playwright/test');

test.use({
    geolocation: { latitude: 48.8584, longitude: 2.2945 },
    permissions: ['geolocation'],
});

test('Visual Map Test (OpenStreetMap)', async ({ page }) => {
    await page.goto('https://www.openstreetmap.org/');

    // 1. locate the "Show My Location" arrow button
    const locateBtn = page.locator('.control-locate .control-button');

    // 2. Click it
    await locateBtn.click();

    // 3. Wait for the URL to update with our coordinates
    // The URL will look like: https://www.openstreetmap.org/#map=19/48.85840/2.29450
    // We use a RegExp to allow for slight rounding differences
    await expect(page).toHaveURL(/48\.858/);
    await expect(page).toHaveURL(/2\.29/);

    await page.waitForTimeout(5000); // wait a bit to visually confirm the map centers

    console.log('✅ Map centered on Eiffel Tower!');
});