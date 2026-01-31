import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://app.eduverse.com/login'); // Aapke Eduverse jaise projects ke liye [cite: 52]
  await page.fill('#username', 'harendra_singh');
  await page.fill('#password', 'mypassword');
  await page.click('button[type="submit"]');

  // Wait karein jab tak login confirm na ho jaye
  await page.waitForURL('**/dashboard');

  // Cookies aur Local Storage save karein
  await page.context().storageState({ path: authFile });
});