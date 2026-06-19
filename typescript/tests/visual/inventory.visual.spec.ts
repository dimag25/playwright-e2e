import { test, expect } from '../../src/fixtures/test-fixtures.js';

/**
 * Visual & structural regression with two complementary techniques:
 *
 *  1. ARIA snapshots (`toMatchAriaSnapshot`) — resolution-independent
 *     structural assertions on the accessibility tree. Robust across
 *     browsers/OSes. Baselines live in `*.aria.yml` next to the spec.
 *  2. Pixel screenshots (`toHaveScreenshot`) — classic visual diffing.
 *
 * Generate / update baselines with:  npm test -- --update-snapshots
 */
test.describe('Visual regression @visual', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectLoaded();
  });

  test('product sort control matches its ARIA snapshot', async ({
    inventoryPage,
  }) => {
    // ARIA snapshots assert accessible roles/names — resolution-independent
    // and far more robust than pixel diffs for structural regression.
    await expect(inventoryPage.sortDropdown).toMatchAriaSnapshot(`
      - combobox:
        - option "Name (A to Z)" [selected]
        - option "Name (Z to A)"
        - option "Price (low to high)"
        - option "Price (high to low)"
    `);
  });

  test('first product card is visually stable', async ({ inventoryPage }) => {
    await expect(inventoryPage.items.first()).toHaveScreenshot(
      'first-product-card.png',
      { maxDiffPixelRatio: 0.02 },
    );
  });
});
