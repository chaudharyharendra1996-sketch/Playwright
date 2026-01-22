const { test, expect } = require('@playwright/test');

test('API PATCH Request - Update Only Job', async ({ request }) => {
  
  // 1. Data to Update (Partial)
  // Hum sirf 'job' bhej rahe hain. 'name' nahi bhej rahe.
  // Server 'name' ko touch nahi karega, sirf 'job' update karega.
  const partialData = {
    job: 'Team Lead'
  };

  // 2. Send PATCH Request to User ID 2
  const response = await request.patch('https://reqres.in/api/users/2', {
    data: partialData
  });

  // 3. Validate Status Code (200 OK)
  console.log(`Status Code: ${response.status()}`);
  expect(response.status()).toBe(200);

  // 4. Validate Response Body
  const responseBody = await response.json();
  console.log('Patched User:', responseBody);

  // Check if Job was updated
  expect(responseBody.job).toBe('Team Lead');
  
  // Verify 'updatedAt' exists
  expect(responseBody.updatedAt).toBeTruthy();

  console.log('✅ User Patch Successful!');
});