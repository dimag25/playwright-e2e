import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { InventoryPage } from '../../src/pages/InventoryPage.js';
import { users } from '../../src/data/users.js';

const authFile = 'playwright/.auth/user.json';

/**
 * Authenticate once and persist the storage state. Every browser project
 * depends on this `setup` project and reuses the session, so individual specs
 * start already logged in — faster and less flaky than logging in per test.
 *
 * Docs: https://playwright.dev/docs/auth
 */
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  // Persist cookies + localStorage for reuse across projects.
  await page.context().storageState({ path: authFile });
  expect(page.url()).toContain('inventory');
});
