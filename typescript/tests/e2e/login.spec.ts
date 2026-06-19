import { test, expect } from '../../src/fixtures/test-fixtures.js';
import { users } from '../../src/data/users.js';

/**
 * Login / logout flows.
 *
 * These tests must run UNauthenticated, so we discard the shared storage
 * state injected by the `setup` project.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication @e2e', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in and out successfully @smoke', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
    expect(inventoryPage.url()).toContain('inventory');

    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('rejects invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.expectLoginError(
      'Username and password do not match any user',
    );
  });

  test('blocks a locked-out user', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectLoginError('this user has been locked out');
  });

  test('requires a username', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectLoginError('Username is required');
  });
});
