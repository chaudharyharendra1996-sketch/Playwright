import { test, expect, chromium } from '@playwright/test';

let browser;
let context;
let page;


test.beforeAll(async () => {
    console.log("Launching browser...");
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('http://127.0.0.1:5500/ProjectTimeOut/HTML/Hook.html');
});

test.afterAll(async () => {
    console.log('Closing the browser...');
    await browser.close();
});

test('Check heading text', async () => {
    const title = page.locator('#title');
    await expect(title).toHaveText('Welcome to PW');
});

test('Check input values', async () => {
    const title = page.locator('#nameInput');
    await expect(title).toHaveValue('test_user');
});
