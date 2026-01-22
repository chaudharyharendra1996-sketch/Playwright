const { test, expect } = require('@playwright/test');

test('API DELETE Request - Remove User', async ({ request }) => {
  
  // 1. Send DELETE Request to a specific User ID
  // (Hum User ID 2 ko delete kar rahe hain)
  const response = await request.delete('https://reqres.in/api/users/2');

  // 2. Validate Status Code (204 = No Content)
  // Most APIs return 204 because "Kaam ho gaya, ab wapis dikhane ko kuch nahi hai".
  console.log(`Status Code: ${response.status()}`);
  expect(response.status()).toBe(204);

  // 3. Optional Verification Check
  // Note: reqres.in resets data automatically, but in a Real Project:
  // You should verify status text.
  expect(response.statusText()).toBe('No Content');

  console.log('✅ User Delete Successful!');
});