import { test, expect } from '../../src/fixtures/test-fixtures.js';

/**
 * Demonstrates request interception / mocking with `page.route`.
 *
 * Here we abort image requests to speed up the run and prove the page still
 * renders. Real-world usage: stub backend JSON to test edge cases
 * deterministically without a live server.
 */
test.describe('Network interception @e2e', () => {
  test('blocks images and still renders the inventory', async ({
    page,
    inventoryPage,
  }) => {
    let blocked = 0;
    await page.route('**/*.{png,jpg,jpeg,svg,webp}', (route) => {
      blocked += 1;
      return route.abort();
    });

    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectLoaded();

    expect(blocked).toBeGreaterThan(0);
  });

  test('fulfills a route with a mocked response', async ({ page }) => {
    await page.route('**/mocked-endpoint', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'hello from a mock' }),
      }),
    );

    const result = await page.evaluate(async () => {
      const res = await fetch('https://example.com/mocked-endpoint');
      return res.json();
    });

    expect(result).toEqual({ message: 'hello from a mock' });
  });
});
