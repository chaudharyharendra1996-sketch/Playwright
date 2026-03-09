// @ts-check
import { test, expect, request } from '@playwright/test';

/**
 * Test Suite: PUT /booking/:id — Update Booking
 * API: https://restful-booker.herokuapp.com/booking/:id
 *
 * Flow:
 *  1. POST /auth        → get auth token
 *  2. GET  /booking     → fetch a valid booking ID
 *  3. PUT  /booking/:id → update the booking using the token
 */

const BASE_URL = 'https://restful-booker.herokuapp.com';

const CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

const UPDATED_BOOKING = {
  firstname: 'James',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2018-01-01',
    checkout: '2019-01-01',
  },
  additionalneeds: 'Breakfast',
};

// ──────────────────────────────────────────────────────────────
// Test Suite
// ──────────────────────────────────────────────────────────────

test.describe('PUT /booking/:id — Update Booking', () => {
  /** @type {import('@playwright/test').APIRequestContext} */
  let apiContext;
  /** @type {string} */
  let authToken;
  /** @type {number} */
  let bookingId;

  // ── Setup: Authenticate + fetch a valid booking ID ──────────
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Step 1: Get auth token via POST /auth
    const authResponse = await apiContext.post('/auth', {
      data: CREDENTIALS,
    });
    const authBody = await authResponse.json();
    authToken = authBody.token;
    console.log(`🔐 Auth token obtained: ${authToken}`);

    // Step 2: Get a valid booking ID via GET /booking
    const listResponse = await apiContext.get('/booking');
    const bookings = await listResponse.json();
    bookingId = bookings[0].bookingid;
    console.log(`📋 Using booking ID: ${bookingId}`);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // ── TC-01: Verify status code is 200 OK ─────────────────────
  test('TC-01: PUT /booking/:id should return status 200 OK', async () => {
    const response = await apiContext.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: UPDATED_BOOKING,
    });

    console.log(`📡 Status: ${response.status()} ${response.statusText()}`);
    expect(response.status()).toBe(200);
  });

  // ── TC-02: Response body matches the updated payload ─────────
  test('TC-02: Response body should reflect all updated fields', async () => {
    const response = await apiContext.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: UPDATED_BOOKING,
    });

    const body = await response.json();
    console.log('📦 Response body:', JSON.stringify(body, null, 2));

    expect(body.firstname).toBe(UPDATED_BOOKING.firstname);
    expect(body.lastname).toBe(UPDATED_BOOKING.lastname);
    expect(body.totalprice).toBe(UPDATED_BOOKING.totalprice);
    expect(body.depositpaid).toBe(UPDATED_BOOKING.depositpaid);
    expect(body.additionalneeds).toBe(UPDATED_BOOKING.additionalneeds);
  });

  // ── TC-03: Booking dates are correctly updated ────────────────
  test('TC-03: Booking dates (checkin / checkout) should be updated', async () => {
    const response = await apiContext.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: UPDATED_BOOKING,
    });

    const body = await response.json();

    expect(body.bookingdates.checkin).toBe(UPDATED_BOOKING.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(UPDATED_BOOKING.bookingdates.checkout);
  });

  // ── TC-04: PUT without auth token should return 403 ──────────
  test('TC-04: PUT /booking/:id without auth token should return 403 Forbidden', async () => {
    const response = await apiContext.put(`/booking/${bookingId}`, {
      data: UPDATED_BOOKING,
    });

    console.log(`🔒 No-auth status: ${response.status()}`);
    expect(response.status()).toBe(403);
  });

  // ── TC-05: PUT with invalid booking ID should return 405 ──────
  test('TC-05: PUT /booking/:id with invalid ID should return 405', async () => {
    const response = await apiContext.put('/booking/999999999', {
      headers: { Cookie: `token=${authToken}` },
      data: UPDATED_BOOKING,
    });

    console.log(`⚠️  Invalid ID status: ${response.status()}`);
    expect(response.status()).toBe(405);
  });

  // ── TC-06: Response Content-Type should be application/json ──
  test('TC-06: Response Content-Type should be application/json', async () => {
    const response = await apiContext.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
      data: UPDATED_BOOKING,
    });

    const contentType = response.headers()['content-type'];
    console.log(`📄 Content-Type: ${contentType}`);
    expect(contentType).toContain('application/json');
  });

  // ── TC-07: Using Authorization header instead of Cookie ───────
  test('TC-07: PUT /booking/:id using Basic Authorization header should succeed', async () => {
    const basicAuth = Buffer.from(`${CREDENTIALS.username}:${CREDENTIALS.password}`).toString('base64');

    const response = await apiContext.put(`/booking/${bookingId}`, {
      headers: { Authorization: `Basic ${basicAuth}` },
      data: UPDATED_BOOKING,
    });

    console.log(`🔑 Basic Auth status: ${response.status()}`);
    expect(response.status()).toBe(200);
  });
});
