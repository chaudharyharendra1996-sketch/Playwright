// @ts-check
import { test, expect, request } from '@playwright/test';

/**
 * Test Suite: POST /auth — Create Auth Token
 * API: https://restful-booker.herokuapp.com/auth
 *
 * NOTE: The actual API returns HTTP 200 OK (not 201 Created).
 * The test below follows your requirement to verify 201 Created.
 * See the "Actual API Behavior" test to verify the live response.
 */

const BASE_URL = 'https://restful-booker.herokuapp.com';

const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password123',
};

// ──────────────────────────────────────────────────────────────
// Test Suite
// ──────────────────────────────────────────────────────────────

test.describe('POST /auth — Create Auth Token', () => {
  /**
   * @type {{ dispose: () => any; post: (arg0: string, arg1: { data: { username: string; password: string; } | { username: string; password: string; } | { username: string; }; }) => any; }}
   */
  let apiContext;

  test.beforeAll(async () => {
    // Create a reusable API request context
    apiContext = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // ── TC-01: Verify status code is 201 Created (your requirement) ──
  test('TC-01: POST /auth should return status code 201 Created', async () => {
    const response = await apiContext.post('/auth', {
      data: VALID_CREDENTIALS,
    });

    // ⚠️  IMPORTANT: The live API actually returns 200 OK.
    // Change expect(response.status()).toBe(200) to match the real API,
    // or configure your server/mock to return 201.
    expect(
      response.status(),
      `Expected 201 Created but received ${response.status()}`
    ).toBe(201);
  });

  // ── TC-02: Verify actual live API status code (200 OK) ──
  test('TC-02: POST /auth should return status code 200 OK (actual API behavior)', async () => {
    const response = await apiContext.post('/auth', {
      data: VALID_CREDENTIALS,
    });

    expect(response.status()).toBe(200);
    console.log(`✅ Status: ${response.status()} ${response.statusText()}`);
  });

  // ── TC-03: Response body contains a token field ──
  test('TC-03: Response body should contain a valid token string', async () => {
    const response = await apiContext.post('/auth', {
      data: VALID_CREDENTIALS,
    });

    const body = await response.json();

    console.log('📦 Response body:', body);

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  // ── TC-04: Content-Type header is application/json ──
  test('TC-04: Response Content-Type should be application/json', async () => {
    const response = await apiContext.post('/auth', {
      data: VALID_CREDENTIALS,
    });

    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  // ── TC-05: Invalid credentials should NOT return a valid token ──
  test('TC-05: POST /auth with wrong credentials should return error message', async () => {
    const response = await apiContext.post('/auth', {
      data: { username: 'wronguser', password: 'wrongpass' },
    });

    const body = await response.json();

    console.log('🔒 Invalid credentials response:', body);

    // API returns { "reason": "Bad credentials" } on failure
    expect(body).not.toHaveProperty('token');
    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });

  // ── TC-06: Missing password field should return an error ──
  test('TC-06: POST /auth with missing password should return error', async () => {
    const response = await apiContext.post('/auth', {
      data: { username: 'admin' },
    });

    const body = await response.json();

    console.log('⚠️  Missing password response:', body);

    expect(body).not.toHaveProperty('token');
  });
});
