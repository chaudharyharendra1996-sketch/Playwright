/* import { test, expect } from '@playwright/test';

test('Registration Form Practice', async ({ page }) => {
  // 1. Go to the practice website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 2. Fill in the Name (Input Field)
  // Using ID locator because it is more reliable for this specific site
  await page.locator('#name').fill('Harendra Singh');

  // 3. Select Gender (Radio Button) - Choosing "Male"
  await page.getByLabel('Male', { exact: true }).check();

  // 4. Select Days (Checkboxes) - Choosing "Sunday" and "Monday"
  await page.getByLabel('Sunday').check();
  await page.getByLabel('Monday').check();

  // 5. Assertions (Validation) - Check if they are actually selected
  await expect(page.getByLabel('Male', { exact: true })).toBeChecked();
  await expect(page.getByLabel('Sunday')).toBeChecked();
  
  // Pause here for 3 seconds so you can see the result with your eyes
  await page.waitForTimeout(3000);
}); */

// type 2

import { test, expect } from '@playwright/test';

test('Registration Form Practice', async ({ page }) => {
  // 1. Go to the NEW, faster practice website
  // (Humne URL change kar diya taaki timeout na ho)
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // 2. Fill in the Name (Input Field)
  // (Is website par name box ka ID '#name' hi hai)
  await page.locator('#name').fill('Harendra Singh');

  // 3. Select Radio Button 
  // (Is site par Radio button ka value 'radio1' hai)
  await page.locator('input[value="radio1"]').check();

  // 4. Select Checkboxes
  // (Yahan checkboxes ke ID 'checkBoxOption1' aur 'checkBoxOption2' hain)
  await page.locator('#checkBoxOption1').check();
  await page.locator('#checkBoxOption2').check();

  // 5. Assertions (Validation)
  // Check if radio button is selected
  await expect(page.locator('input[value="radio1"]')).toBeChecked();
  // Check if first checkbox is selected
  await expect(page.locator('#checkBoxOption1')).toBeChecked();
  
  // Pause for 3 seconds to see the result
  await page.waitForTimeout(3000);
});