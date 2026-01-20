const { test, expect } = require('@playwright/test');

test.describe('Annotations Demo', () => {

  // 1. SKIP: Ye run nahi hoga
  test.skip('Test 1: This is skipped', async ({ page }) => {
    console.log('You will not see this message.');
  });

  // 2. FAIL: Ye fail hoga, par report Green aayegi
  test('Test 2: Expected to Fail', async ({ page }) => {
    test.fail(); // Humne bol diya ye fail hoga
    
    // Ye code actually fail karega (kyunki title "Google" nahi hai)
    // Par kyunki humne 'test.fail()' lagaya hai, Playwright isko PASS maanega.
    await expect(page).toHaveTitle('This Title Does Not Exist');
  });

  // 3. SLOW: Isko extra time milega
  test('Test 3: Slow Test', async ({ page }) => {
    test.slow(); // Timeout increased by 3x
    
    console.log('Running slow operation...');
    await page.waitForTimeout(5000); // 5 seconds wait
    console.log('Finished slow operation');
  });

  // 4. FIXME: Ye bhi skip hoga (future ke liye)
  test.fixme('Test 4: Broken test', async ({ page }) => {
    console.log('This will not run. Needs fixing.');
  });

  // 5. ONLY: Agar ye uncomment kar diya, toh UPAR WALE SAB ignore ho jayenge
  // test.only('Test 5: Focus Test', async ({ page }) => {
  //   console.log('Only this test runs!');
  // });

});