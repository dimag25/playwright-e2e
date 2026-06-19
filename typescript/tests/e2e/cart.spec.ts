import { test, expect } from '../../src/fixtures/test-fixtures.js';
import { products } from '../../src/data/users.js';

/**
 * Shopping cart flows. These reuse the authenticated storage state from the
 * `setup` project, so each test begins already logged in.
 */
test.describe('Shopping cart @e2e', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectLoaded();
  });

  test('adds items to the cart and updates the badge @smoke', async ({
    inventoryPage,
  }) => {
    await inventoryPage.expectCartCount(0);
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.expectCartCount(1);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.expectCartCount(2);
  });

  test('removes an item from the cart page', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.fleeceJacket);
    await inventoryPage.openCart();

    await cartPage.expectItemCount(2);
    await cartPage.removeItem(products.backpack);
    await cartPage.expectItemCount(1);
    expect(await cartPage.itemNames()).toEqual([products.fleeceJacket]);
  });

  test('sorts products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const names = await inventoryPage.productNames();
    // Cheapest Sauce Labs item should be first after sorting low → high.
    expect(names[0]).toBe(products.onesie);
  });
});
