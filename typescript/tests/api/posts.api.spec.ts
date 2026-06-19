import { test, expect } from '@playwright/test';

/**
 * Pure API testing with Playwright's `request` fixture — no browser involved.
 * Demonstrates GET/POST, status & header assertions, and JSON body checks
 * against a stable public sandbox API.
 *
 * Runs in the `api` project (see playwright.config.ts).
 */
const API_BASE =
  process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API @api', () => {
  test('GET /posts/1 returns a well-formed post @smoke', async ({
    request,
  }) => {
    const response = await request.get(`${API_BASE}/posts/1`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts returns a non-empty collection', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts`);
    expect(response.ok()).toBeTruthy();

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(10);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const payload = { title: 'playwright', body: 'e2e', userId: 99 };
    const response = await request.post(`${API_BASE}/posts`, { data: payload });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('GET unknown resource returns 404', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts/0`);
    expect(response.status()).toBe(404);
  });
});
