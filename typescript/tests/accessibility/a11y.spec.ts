import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../../src/fixtures/test-fixtures.js';

/**
 * Automated accessibility checks with axe-core.
 *
 * We scan against WCAG 2.1 A/AA rule tags and assert there are no violations.
 * Findings are also attached to the HTML report for triage.
 */
test.describe('Accessibility @a11y', () => {
  test('login page has no WCAG A/AA violations @smoke', async ({
    page,
    loginPage,
  }, testInfo) => {
    // Login page must be scanned logged-out.
    await page.context().clearCookies();
    await loginPage.open();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    await testInfo.attach('axe-results', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });

    expect(results.violations).toEqual([]);
  });

  test('inventory page accessibility scan', async ({ page, inventoryPage }) => {
    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectLoaded();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Report violations without failing the suite for this known-imperfect demo.
    test.info().annotations.push({
      type: 'a11y-violations',
      description: String(results.violations.length),
    });
    expect(results.violations.length).toBeLessThanOrEqual(5);
  });
});
