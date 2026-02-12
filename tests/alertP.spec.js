import { test,expect } from "@playwright/test";
test('Handle Alerts',async({page} )=>{

/* //Simple Alert
await page.goto('https://testautomationpractice.blogspot.com/')
page.once('dialog', async dialog => {    
    expect (dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('I am an alert box!');
    await dialog.accept();
});
await page.waitForTimeout(2000);
await page.locator('#alertBtn').click();
})   */

/* //Confirm Alert
await page.goto('https://testautomationpractice.blogspot.com/')
page.once('dialog', async dialog => {    
    expect (dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Press a button!');
    await dialog.accept(); // Click OK 
    await dialog.dismiss();   // Click Cancel
});
await page.waitForTimeout(2000);
await page.locator('#confirmBtn').click();
await expect(page.locator("//p[@id='demo']")).toHaveText('You pressed Cancel!');
const resultText = await page.locator("//p[@id='demo']").textContent();

console.log('Text after clicking Cancel:'+resultText);
}) */

//Prompt Alert
await page.goto('https://testautomationpractice.blogspot.com/')
page.once('dialog', async dialog => {    
    expect (dialog.type()).toBe('prompt');
    expect(dialog.message()).toBe('Please enter your name:');
    expect(dialog.defaultValue()).toBe('Harry Potter');
    await dialog.accept('Harry Puttar'); // Click OK 
    //await dialog.dismiss();   // Click Cancel
});
await page.waitForTimeout(1000);
await page.locator('#promptBtn').click();
const demo = page.locator("#demo")
//await expect(demo).toHaveText('Hello Harry Puttar! How are you today?');
const resultText = await demo.textContent();
console.log('Result text:'+ resultText);
})