import { test, expect } from '@playwright/test';

test('Facebook Drop Down Selection', async ({ page }) => {

    await page.goto('https://www.facebook.com/r.php?locale=en_GB&display=page&entry_point=login');

    // 1. SELECT DAY
    const dayLocator = page.locator('#day'); // Store the locator, not the text
    await dayLocator.selectOption('4'); // Select '4'
    
    // Verify the selection (Value is '4')
    await expect(dayLocator).toHaveValue('4');


    // 2. SELECT MONTH
    const monthLocator = page.locator('#month'); // Store the locator for the month dropdown
    await monthLocator.selectOption('7'); // Select 'Jul' (Value is '7')
    // OR select by value: await monthLocator.selectOption({ value: '7' });


    // 3. SELECT YEAR
    const yearLocator = page.locator('#year');
    await yearLocator.selectOption('1995');


    // 4. PRINT VALUES (Optional)
    // To get the text of what is currently selected, use inputValue() for dropdowns
    console.log("Selected Day: " + await dayLocator.inputValue());
    console.log("Selected Month: " + await monthLocator.inputValue());
    console.log("Selected Year: " + await yearLocator.inputValue());


    // 5. Radio Button & Sign Up
    await page.getByText('Male', { exact: true }).click();
    await page.getByRole('button', { name: 'Sign up' }).click();

});