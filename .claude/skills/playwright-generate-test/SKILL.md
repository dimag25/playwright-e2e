---
name: playwright-generate-test
description: Explore a user flow with the Playwright MCP, then emit a hardened, review-ready Playwright spec into this repo following its Page Object Model + fixtures + tag conventions (TypeScript or Python). Use when asked to "generate/write/scaffold a test", "create a spec for this flow", or "turn this journey into an automated test".
---

# Playwright MCP — Generate a hardened test

Turn a real, explored browser flow into a maintainable spec that matches this
repository's conventions. The MCP is for **discovery**; the committed test must
be deterministic, locator-based, and reviewed.

## Workflow

1. **Explore the flow live** (see the `playwright-explore` skill). Use
   `mcp__playwright__browser_navigate` + `browser_snapshot` and perform each step,
   recording the **role + accessible name** (or `data-test` id) of every element.
2. **Choose the language** from the user's request or what the flow touches:
   - TypeScript → `typescript/tests/<area>/<name>.spec.ts`
   - Python → `python/tests/test_<name>.py`
3. **Reuse or extend Page Objects — never inline selectors in specs.**
   - TS objects: `typescript/src/pages/*.ts` (extend `BasePage`).
   - Py objects: `python/pages/*.py` (extend `BasePage`).
   - If the flow needs an element/action that doesn't exist yet, add a typed
     `Locator` and method to the relevant page object first.
4. **Write the spec using fixtures, not `new SomePage(page)`:**
   - TS: `import { test, expect } from '../../src/fixtures/test-fixtures.js';`
     then destructure `{ loginPage, inventoryPage, cartPage }`.
   - Py: use the `login_page` / `inventory_page` / `cart_page` / `logged_in`
     fixtures from `conftest.py`.
5. **Apply the rules in `docs/BEST_PRACTICES.md`:**
   - Web-first assertions only (`await expect(locator)...`) — no `waitForTimeout`.
   - User-facing locators (`getByRole`/`getByLabel`/`getByTestId`).
   - Independent & parallel-safe; no ordering assumptions.
   - Tag the test: `@smoke`, `@e2e`, `@api`, `@a11y`, or `@visual`.
   - Auth: reuse the shared `storageState` (TS `setup` project / Py `logged_in`).
     For logged-out tests in TS, add
     `test.use({ storageState: { cookies: [], origins: [] } })`.
6. **Validate before claiming success:**
   - TS: `cd typescript && npm run typecheck && npm run lint && npx playwright test <file> --project=chromium`
   - Py: `cd python && ruff check . && pytest <file> -q`
   - If browser download/egress is blocked locally, at minimum run
     `npx playwright test --list` (TS) / `pytest --collect-only` (Py) to prove the
     spec compiles and is wired correctly, and say so.

## Quality bar

- The spec reads as intent: setup via fixtures, action via page-object methods,
  outcome via `expect`.
- Selectors are derived from a real `browser_snapshot`, not guessed.
- No flakiness crutches (`slowMo`, fixed sleeps, retries to mask races).

## Template (TypeScript)

```ts
import { test, expect } from '../../src/fixtures/test-fixtures.js';
import { products } from '../../src/data/users.js';

test.describe('<Area> @e2e', () => {
  test('<does the thing> @smoke', async ({ inventoryPage }) => {
    await inventoryPage.goto('/inventory.html');
    await inventoryPage.expectLoaded();
    // ...action via page-object methods...
    await inventoryPage.expectCartCount(1);
  });
});
```

Finish by telling the user exactly which files you added/changed and the
command you ran to validate them.
