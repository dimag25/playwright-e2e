import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

/**
 * Custom fixtures inject ready-to-use page objects into every test, so specs
 * stay declarative and free of `new SomePage(page)` boilerplate.
 *
 * Usage:
 *   import { test, expect } from '@fixtures/test-fixtures';
 *   test('...', async ({ inventoryPage }) => { ... });
 */
interface Pages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
}

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };
