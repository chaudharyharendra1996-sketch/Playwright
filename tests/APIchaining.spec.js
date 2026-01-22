const { test, expect } = require('@playwright/test');

test('Hotel Booking API Chaining (Auth -> Create -> Get -> Update -> Delete)', async ({ request }) => {
  
  // Variables to store dynamic data
  let bookingId;
  let token;

  // ---------------------------------------------------------
  // STEP 1: AUTH (Login to get Token)
  // We need this token to Update and Delete later.
  // ---------------------------------------------------------
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: "admin",
      password: "password123"
    }
  });

  const authData = await authResponse.json();
  token = authData.token; // 🟢 Save Token
  console.log(`Step 1: Login Successful. Token: ${token}`);
  expect(token).toBeTruthy();

  // ---------------------------------------------------------
  // STEP 2: CREATE Booking (POST)
  // ---------------------------------------------------------
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: {
      firstname: "Playwright",
      lastname: "User",
      totalprice: 1000,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-05"
      },
      additionalneeds: "Breakfast"
    }
  });

  const createData = await createResponse.json();
  bookingId = createData.bookingid; // 🟢 Save Booking ID
  console.log(`Step 2: Booking Created. ID: ${bookingId}`);
  expect(createResponse.ok()).toBeTruthy();

  // ---------------------------------------------------------
  // STEP 3: GET Booking (Verify it exists)
  // ---------------------------------------------------------
  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  const getData = await getResponse.json();
  
  console.log('Step 3: Booking Verified via GET');
  expect(getData.firstname).toBe('Playwright');
  expect(getData.totalprice).toBe(1000);

  // ---------------------------------------------------------
  // STEP 4: UPDATE Booking (PUT)
  // Note: We must pass the 'Cookie' header with the token
  // ---------------------------------------------------------
  const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      'Cookie': `token=${token}`, // 🔑 Auth Token used here
      'Accept': 'application/json'
    },
    data: {
      firstname: "Playwright",
      lastname: "User",
      totalprice: 2000, // Price changed
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-10" // Date changed
      },
      additionalneeds: "Dinner" // Changed from Breakfast
    }
  });

  const updateData = await updateResponse.json();
  console.log(`Step 4: Booking Updated. New Needs: ${updateData.additionalneeds}`);
  expect(updateData.totalprice).toBe(2000);

  // ---------------------------------------------------------
  // STEP 5: DELETE Booking
  // ---------------------------------------------------------
  const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      'Cookie': `token=${token}` // 🔑 Auth Token required
    }
  });

  console.log('Step 5: Booking Deleted');
  expect(deleteResponse.status()).toBe(201); // This API returns 201 for delete

  // ---------------------------------------------------------
  // FINAL CHECK: Verify it is gone (404)
  // ---------------------------------------------------------
  const verifyDelete = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  expect(verifyDelete.status()).toBe(404);
  console.log('✅ End-to-End Test Passed!');
});