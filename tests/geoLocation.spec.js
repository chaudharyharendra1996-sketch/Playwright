const { test, expect } = require('@playwright/test');

test.use({
  // 1. Set Coordinates (Eiffel Tower)
  geolocation: { latitude: 48.8584, longitude: 2.2945 },
  permissions: ['geolocation'],
  locale: 'fr-FR'
});

test('Verify Geolocation Injection', async ({ page }) => {
  // Use a site dedicated to testing geolocation (faster & more reliable than Maps)
  await page.goto('https://browserleaks.com/geo');

  // The site automatically asks for location. 
  // Since we auto-granted permissions, it loads immediately.

  // Verify the Latitude matches our injection
  const latLocator = page.locator('#latitude');
  await expect(latLocator).toContainText('48.8584');

  // Verify the Longitude matches our injection
  const longLocator = page.locator('#longitude');
  await expect(longLocator).toContainText('2.2945');

  console.log('✅ Browser successfully reported the fake location!');
});