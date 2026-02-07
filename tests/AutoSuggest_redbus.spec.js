import { test, expect } from "@playwright/test";
test('Redbus', async ({ page }) => {

    await page.goto('https://www.redbus.in');

    await page.locator('#srcinput').fill('Delhi');

    
    await page.waitForSelector("//div[starts-with(@class, 'listHeader')]")
    const newone = await page.locator("//div[starts-with(@class, 'listHeader')]").allInnerTexts();
    console.log(newone);
       
    for (const input of newone) 
    {
    
        if (newone.includes('Mayur Vihar')) 
        {
            await input.click();
            break;
        }
        //console.log(newInput);
    }






})


