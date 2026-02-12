import { test, expect } from "@playwright/test";
test('Redbus', async ({ page }) => {

    await page.goto('https://www.redbus.in');

    await page.locator('#srcinput').fill('Delhi');


    await page.waitForSelector("//div[@role='heading']")
    const droplist = await page.locator("//div[@role='heading']").allInnerTexts();
    console.log(droplist);

    
        for (const input of droplist) {
    
            if (droplist.includes('Mayur Vihar')) {
                await input.click();
                break;
            }
    
        }

   
})




