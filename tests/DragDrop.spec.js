const { test, expect } = require('@playwright/test');

test.describe('Drag and Drop Examples', () => {

  // Method 1: The Easy Way (Using dragTo)
  test('Method 1: Simple Drag and Drop using built-in command', async ({ page }) => {
    
    // 1. Open the demo website
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    // 2. Locate Source (Box A) and Target (Box B)
    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    // 3. Perform Drag and Drop
    // (Ye command Box A ko Box B par le jakar chhod dega)
    await source.dragTo(target);

    // 4. Verify if it worked
    await expect(target).toHaveText('A');
    
    console.log(' Method 1 (dragTo) Passed!');
  });

  //Method 2: The Manual Way (Mouse Actions)

  test('Method 2: Manual Drag and Drop using Mouse', async ({ page }) => {
    
    // 1. Open the demo website
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    await page.locator('#column-a').hover();
    await page.mouse.down();
    await page.locator('#column-b').hover();
    await page.mouse.up();



    /* const source = page.locator('#column-a');
    const target = page.locator('#column-b'); */

    /* // 2. Get the specific positions (coordinates) of the boxes
    // (Box B kahan par hai, uska X aur Y pata kar rahe hain)
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();

    // Safety check: Agar box nahi mila toh test fail
    if (!sourceBox || !targetBox) {
        throw new Error('Could not find the boxes!');
    }

    // 3. Perform Mouse Actions Sequence
    
    // Step A: Move mouse to center of Box A (Source)
    await page.mouse.move(
        sourceBox.x + sourceBox.width / 2, 
        sourceBox.y + sourceBox.height / 2
    );

    // Step B: Press Mouse Down (Click karke pakad lo)
    await page.mouse.down();

    // Step C: Move mouse to center of Box B (Target)
    await page.mouse.move(
        targetBox.x + targetBox.width / 2, 
        targetBox.y + targetBox.height / 2
    );

    // Step D: Release Mouse (Chhod do)
    await page.mouse.up();

 */    // 4. Verify
    //await expect(target).toHaveText('A');

    console.log('Method 2 (Manual Mouse) Passed!');
  });

});
