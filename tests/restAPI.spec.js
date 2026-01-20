const { test, expect } = require('@playwright/test');

test('API GET Request - Fetch User Data', async ({ request }) => {
  
  // 1. Send GET Request
  // (Server se data maang rahe hain)
  const response = await request.get('https://reqres.in/api/users/2');

  // 2. Validate Status Code (Should be 200 OK)
  console.log(`Status Code: ${response.status()}`);
  expect(response.status()).toBe(200);

  // 3. Check if response is successful (200-299 range)
  expect(response.ok()).toBeTruthy();

  // 4. Parse the JSON Body
  // (Response body ko readable format mein convert kar rahe hain)
  const responseBody = await response.json();
  console.log('User Data:', responseBody);

  // 5. Validate Specific Data
  // Verify that the user's first name is "Janet"
  expect(responseBody.data.first_name).toBe('Janet');
  expect(responseBody.data.email).toContain('@reqres.in');

  console.log('✅ API Test Passed!');
});