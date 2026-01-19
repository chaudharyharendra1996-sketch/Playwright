import {test, chromium} from '@playwright/test';
test('Use Locator' , async ({page}) => {


    await page.goto('http://127.0.0.1:5500/ProjectOne/html/locator.html');
    await page.locator('[name="email"]').fill('playwright@test.com');
    await page.locator('[name="password"]').fill('secure123');
   
    await page.getByRole('button', { name: 'Login' }).click();
    console.log('Login has clicked')
    await page.waitForTimeout(2000);

});