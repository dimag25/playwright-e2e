# Playwright Best Practices (as applied in this repo)

A condensed, opinionated checklist reflecting current (2026) Playwright
guidance. Each item links to where it's demonstrated in the codebase.

## Locators & selectors

- **Use user-facing locators.** Prefer `getByRole`, `getByLabel`,
  `getByText`, and `getByTestId` over CSS/XPath. They auto-wait and survive
  refactors. _See `src/pages/*.ts` and `python/pages/*.py`._
- **Never use `ElementHandle` (`page.$`).** Locators are lazy and
  auto-retrying; handles are not. (The old version of this repo used handles —
  now removed.)
- **Scope, don't chain fragile selectors.** Filter a parent locator
  (`.filter({ hasText })`) then find the action inside it.
- **Configure `testIdAttribute`** to match your app (`data-test` here) instead
  of sprinkling raw attribute selectors.

## Assertions

- **Web-first assertions only** — `await expect(locator).toBeVisible()` retries
  until the condition holds. Avoid `expect(await locator.isVisible())`.
- **No manual sleeps.** Removed `waitForTimeout` / `slowMo` from the hot path;
  rely on auto-waiting and `expect.poll` / `toPass` when needed.

## Structure

- **Page Object Model** with a shared `BasePage` for app-shell behaviour.
- **Fixtures inject page objects** so specs read as intent, not setup
  (`src/fixtures/test-fixtures.ts`, `python/conftest.py`).
- **Authenticate once** via a `setup` project + `storageState`; tests that need
  a logged-out state opt out explicitly (`test.use({ storageState: ... })`).

## Tests

- **Independent & idempotent.** No ordering assumptions; parallel-safe.
- **Tag tests** (`@smoke`, `@e2e`, `@api`, `@a11y`, `@visual`) for slicing runs.
- **Test data via Faker** (`@faker-js/faker`), seedable for determinism.

## Reliability & CI

- `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`,
  `video: 'retain-on-failure'` — rich diagnostics without bloating green runs.
- **Shard in CI** and merge **blob reports** into one HTML report.
- **Pin the Docker image** to the Playwright version to keep browsers in sync.
- Gate merges on **typecheck + lint + format** before tests run.

## Beyond the basics (demonstrated here)

- **API testing** with the `request` context — fast, browserless coverage.
- **Network interception** (`page.route`) for deterministic edge cases.
- **ARIA snapshots** (`toMatchAriaSnapshot`) for resolution-independent
  structural regression.
- **Accessibility** scanning with axe-core on every key page.
