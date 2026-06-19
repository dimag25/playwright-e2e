import { type Page, type Locator, expect } from '@playwright/test';

/**
 * BasePage holds behaviour shared by every page object.
 *
 * Best practices applied:
 *  - Composition over inheritance of raw selectors: subclasses expose typed
 *    {@link Locator}s, never `ElementHandle`s.
 *  - Web-first assertions everywhere (auto-waiting, no manual sleeps).
 */
export abstract class BasePage {
  protected readonly page: Page;

  /** Hamburger menu shared across the authenticated app shell. */
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  /** Navigate to a path relative to the configured `baseURL`. */
  async goto(path = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /** Open the slide-out menu and log the user out. */
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(
      this.page.getByRole('button', { name: 'Login' }),
    ).toBeVisible();
  }

  /** Current page URL — handy for assertions and debugging. */
  url(): string {
    return this.page.url();
  }
}
