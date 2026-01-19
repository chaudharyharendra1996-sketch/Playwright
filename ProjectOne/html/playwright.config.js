// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * require('dotenv').config();
 */

module.exports = defineConfig({
  // 1. Directory where your tests are located
  testDir: './tests',

  // 2. Maximum time one test can run for (30 seconds default)
  timeout: 30 * 1000,

  // 3. Run tests in files in parallel
  fullyParallel: true,

  // 4. Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // 5. Retry on CI only (helps with flaky tests)
  retries: process.env.CI ? 2 : 0,

  // 6. Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // 7. Reporter to use. 'html' opens a visual report after the run.
  reporter: 'html',

  // 8. Global settings shared across all projects
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Take a screenshot only on failure
    screenshot: 'only-on-failure',

    // Record video only when retrying a test
    video: 'on-first-retry',
  },

  // 9. Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit', // Safari engine
      use: { ...devices['Desktop Safari'] },
    },
  ],
});