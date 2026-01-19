import { test, expect, chromium } from "@playwright/test";

test('Handle Multiple Tabs in Single Window', async ({ }) => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    // --- Tab 1: Google ---
    console.log('Opening Tab 1...');
    const pageOne = await context.newPage();
    await pageOne.goto('https://www.google.com/');
    
    // --- Tab 2: Bing ---
    console.log('Opening Tab 2...');
    const pageTwo = await context.newPage();
    await pageTwo.goto('https://www.bing.com/');

    // --- Tab 3: Wikipedia ---
    console.log('Opening Tab 3...');
    const pageThree = await context.newPage();
    await pageThree.goto('https://www.wikipedia.org/');

    // --- Interaction ---
    
    // Interact with Tab 1 (Google) - Even though Tab 3 is currently in front!
    await pageOne.getByRole('combobox', { name: 'Search' }).fill('Playwright Automation');
    console.log('Filled search on Google (Tab 1) while Wikipedia (Tab 3) was visible');

    // Interact with Tab 2 (Bing)
    await pageTwo.locator('#sb_form_q').fill('Microsoft');
    console.log('Filled search on Bing (Tab 2)');

    // --- Visual Switching (Optional) ---
    // Playwright doesn't need this to work, but it helps YOU see what's happening.
    console.log('Bringing Tab 1 to front...');
    await pageOne.bringToFront();
    
    await pageOne.waitForTimeout(1000); // Just for demo to let you see the switch

    console.log('Bringing Tab 2 to front...');
    await pageTwo.bringToFront();

    // --- Cleanup ---
    await browser.close();
});