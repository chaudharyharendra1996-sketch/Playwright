import {test,expect} from '@playwright/test';
test.setTimeout(15000);
test ('Timeout',async({page}) => {
await page.goto('http://127.0.0.1:5500/ProjectTimeOut/HTML/TImeout.html');
await expect(page.locator('#heading')).toHaveText('Welcome to Timeout Testing');
await expect(page).toHaveTitle('Playwright Timeout Demo');
await page.waitForTimeout(500);
await expect(page.locator('#hiddenPara')).toBeHidden();
await expect (page.locator('#agree')).toBeChecked();

await expect(page.locator('#username')).toHaveValue('playwright_user').waitForTimeout(500);
await expect(page.locator('#delayedButton')).click().waitForTimeout(5000);

const status = page.locator('#status');
await expect(status).toHaveText('Done',{timeout: 8000})

})