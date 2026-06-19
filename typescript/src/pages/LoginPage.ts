import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * Page object for the Sauce Demo login screen.
 *
 * Uses role / test-id locators (resolved lazily) instead of `page.$()`
 * ElementHandles, so every interaction auto-waits and auto-retries.
 */
export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async open(): Promise<void> {
    await this.goto('/');
    await expect(this.loginButton).toBeVisible();
  }

  /** Fill credentials and submit. */
  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(expected: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expected);
  }

  async clear(): Promise<void> {
    await this.username.clear();
    await this.password.clear();
  }
}
