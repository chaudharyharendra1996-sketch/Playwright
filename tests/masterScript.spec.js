import { test, expect } from '@playwright/test';

test('Master Script: All Actions, Getters & API', async ({ page, request }) => {

    // ============================================================
    // 1. PAGE METHODS (Navigation) 
    // ============================================================

    // ACTION: Go to the practice page
    await page.goto('https://testautomationpractice.blogspot.com/');

    // ACTION: Set viewport size (Resize window)
    await page.setViewportSize({ width: 1280, height: 720 });

    // GETTER: Get Page Title & URL
    console.log("Page Title: " + await page.title());
    console.log("Page URL: " + page.url());

    // ACTION: Reload the page
    // await page.reload(); 

    // ACTION: Go Back (Commented because we just arrived)
    // await page.goBack(); 


    // ============================================================
    // 2. ELEMENT ACTIONS (Interactions)
    // ============================================================

    // Define Locators
    const nameInput = page.locator('#name');
    const addressInput = page.locator('#textarea');
    const maleRadio = page.locator('#male');
    const sundayCheck = page.locator('#sunday');
    const countryDropdown = page.locator('#country');
    const colorInput = page.locator('#colors'); // Hidden/Dynamic input example

    // --- TYPING & FILLING ---
    // Preferred way to enter text (Fast & clears field first)
    await nameInput.fill('Harendra Singh');

    // Alternative: Type character-by-character (Like a real user)
    // await nameInput.type('Harendra Singh', { delay: 100 }); 

    // Press a key (Simulate hitting Enter)
    // await nameInput.press('Enter');


    // --- CLICKING & SELECTING ---
    // Standard Click
    await maleRadio.click();

    // Double Click (Example: Copy Text button)
    await page.locator('button:has-text("Copy Text")').dblclick();

    // Right Click (Context Menu)
    // await page.locator('#some-element').click({ button: 'right' }); 

    // Check & Uncheck (For Checkboxes/Radio)
    await sundayCheck.check();
    await expect(sundayCheck).toBeChecked(); // Validation
    // await sundayCheck.uncheck();


    // --- DROPDOWNS ---
    // Select by Value or Label
    await countryDropdown.selectOption('usa');
    // await countryDropdown.selectOption({ label: 'United States' });
    // await countryDropdown.selectOption({ index: 1 });


    // --- MOUSE & DRAG ---
    // Drag and Drop (Source -> Target)
    const source = page.locator('#draggable');
    const target = page.locator('#droppable');

    // Check if drag elements exist before trying (Good practice)
    if (await source.isVisible() && await target.isVisible()) {
        await source.dragTo(target);
    }

    // Hover (Move mouse over element)
    // await page.locator('.tooltip').hover();


    // --- FILE UPLOAD ---
    // (Commented out because it requires a real file on your disk)
    // await page.locator('#singleFileInput').setInputFiles('C:/path/to/file.jpg');


    // --- SCREENSHOT ---
    // Take a screenshot of just the name input field
    await nameInput.screenshot({ path: 'name-input.png' });


    // ============================================================
    // 3. ELEMENT GETTERS (Reading Data)
    // ============================================================

    // GETTER: Input Value (Text inside a form field)
    const typedValue = await nameInput.inputValue();
    console.log("User Typed: " + typedValue);

    // GETTER: Visible Text (What user sees)
    const headerText = await page.locator('h1').first().innerText();
    console.log("Header: " + headerText);

    // GETTER: All Content (Includes hidden text)
    // const rawHtml = await page.locator('body').textContent(); 

    // GETTER: Attribute (Get ID, Class, Href, etc.)
    const inputClass = await nameInput.getAttribute('class');
    console.log("Input Class: " + inputClass);

    // GETTER: Count (How many rows in the table?)
    const rowCount = await page.locator('table[name="BookTable"] tr').count();
    console.log("Table Rows Found: " + rowCount);

    // GETTER: Bounding Box (Coordinates)
    const box = await nameInput.boundingBox();
    if (box) {
        console.log(`Input is at X: ${box.x}, Y: ${box.y}`);
    }


    // ============================================================
    // 4. BOOLEAN CHECKS (True/False States) 
    // ============================================================

    // Use these for "if" logic
    const isVisible = await nameInput.isVisible();
    const isHidden = await page.locator('.hidden-element').isHidden();
    const isEnabled = await nameInput.isEnabled();// Same as !isDisabled()
    const isChecked = await sundayCheck.isChecked();

    console.log(`Is Input Visible? ${isVisible}`);
    console.log(`Is Checkbox Checked? ${isChecked}`);


    // ============================================================
    // 5. API RESPONSE METHODS (Network) 
    // ============================================================
    // We use a public dummy API for this example (reqres.in)

    console.log("--- Starting API Check ---");

    // ACTION: Make a GET request
    const response = await request.get('https://reqres.in/api/users/2');

    // GETTER: Status Code
    console.log("API Status: " + response.status()); //(Should be 200)

    // GETTER: Status Text
    console.log("API Status Text: " + response.statusText());// (Should be "OK")

    // GETTER: Is Request Successful? (200-299)
    expect(response.ok()).toBeFalsy();

    // GETTER: JSON Body
    // const jsonResponse = await response.json();
    // console.log("User Name from API: " + jsonResponse.data.first_name);

    // GETTER: Headers
    const headers = response.headers();
    // console.log(headers);

});