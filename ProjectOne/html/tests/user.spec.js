import { test, expect, chromium } from '@playwright/test';

test('User Login Test', async () => {

  const browser = await chromium.launch({ headless: false });             
  const page = await browser.newPage();

  console.log('>>> Starting Page One...');
  await page.goto('http://127.0.0.1:5500/ProjectOne/html/pageOne.html');

  await page.fill('#username', 'myUser');
  await page.fill('#password', 'myPassword');

  await page.getByRole('button', { name: 'Login' }).click();

  console.log('Page One finished successfully');
  await page.waitForTimeout(2000);


  console.log('>>> Starting Page Two...');

  await page.goto('http://127.0.0.1:5500/ProjectOne/html/pageTwo.html');

  await page.fill('#username', 'myTwoUser');
  await page.fill('#password', 'myTwoPassword');
  await page.click('button:has-text("Login")');

  console.log('Page Two finished successfully');
  await page.waitForTimeout(1000);

  await browser.close();
});