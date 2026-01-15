import { test, expect } from '@playwright/test';

test('intent to fail', async ({ page }) => {
  // 1. Go to Google
  await page.goto('https://google.com');

  // 2. ERROR: We expect the title to be "Facebook" (which is wrong!)
  await expect(page).toHaveTitle('Facebook');
});

// npx playwright test -g "intent to fail" --trace on
// npx playwright show-trace test-results/traceviewer-intent-to-fail/trace.zip