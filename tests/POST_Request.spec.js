const { test, expect } = require('@playwright/test');

test('API POST Request - Create New User', async ({ request }) => {
  
  // 1. Define the Data (Payload)
  // (Jo data server ko bhejna hai)
  const userData = {
    name: 'Harry',
    job: 'QA Engineer'
  };

  // 2. Send POST Request
  // Note: We pass 'data' inside the options object
  const response = await request.post('https://reqres.in/api/users', {
    data: userData,
    headers: {
      'Accept': 'application/json'
    }
  });

  // 3. Validate Status Code (201 = Created)
  // (GET ke liye 200 hota hai, par Naya Banane ke liye 201 standard hai)
  console.log(`Status Code: ${response.status()}`);
  expect(response.status()).toBe(201);

  // 4. Validate Response Body
  const responseBody = await response.json();
  console.log('Created User:', responseBody);

  // Check if the server returned the same data we sent
  expect(responseBody.name).toBe('Arjun');
  expect(responseBody.job).toBe('QA Engineer');
  
  // Check if an ID was generated (matlab database mein entry ho gayi)
  expect(responseBody.id).toBeTruthy();
  expect(responseBody.createdAt).toBeTruthy();

  console.log('✅ User Creation Successful!');
});