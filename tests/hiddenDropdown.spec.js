import { test, expect } from '@playwright/test';
test('Hidden Dropdown', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.locator('span').filter({ hasText: 'PIM' }).first().click();
    await page.locator('div').filter({ hasText: '-- Select --' }).first();
    await page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > i:nth-child(1)").click();

    const opt = await page.locator("//div[@role='listbox']//span");



    for (let option of await opt.all()) 
    {
        const dropdown = await option.allTextContents();
        console.log(dropdown);
        if (dropdown.includes('Freelance')) 
        {
            await option.click();
            break;
        }
    }





}
)