import { test, expect } from '@playwright/test';
test('Handle Dropdown', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/tests/drop.html')

    // Select option by value
    const combobox = page.getByRole('combobox');
    await combobox.click();
    await page.selectOption('#colors', 'blue');

    expect(combobox).toHaveValue('blue');
    await page.waitForTimeout(2000);

    /* // Select option by label
    await page.selectOption('#colors', { label: 'Green' });
    expect(page.getByRole('combobox')).toHaveValue('green'); */

    // Select by label
    /* await page.selectOption('#colors', { label: 'Red' });
    selected = await page.$eval('#colors', el => el.value);
    expect(selected).toBe('red');
    await page.waitForTimeout(2000); */
})