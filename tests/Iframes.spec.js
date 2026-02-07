import { test,expect } from "@playwright/test";
test ('Handle Iframes',async({page}) => {

await page.goto('https://ui.vision/demo/webtest/frames/')
// Switch to first iframe and click on 'Click Me' button
const frame1 = await page.frameLocator('[src*="frame_1.html"]');
await frame1.getByRole('textbox').click();
await frame1.fill('Hello I am Frame 1');

// Switch to second iframe and click on 'Click Me' button
const frame2 = await page.frameLocator('[src*="frame_2.html"]');
await frame2.getByRole('textbox').click();
await frame2.fill('Hello I am Frame 2');    



})