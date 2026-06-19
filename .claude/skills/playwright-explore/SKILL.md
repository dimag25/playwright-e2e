---
name: playwright-explore
description: Drive the Playwright MCP server to explore a live web app via accessibility snapshots — navigate flows, inspect elements/roles, read console & network, and report findings. Use when asked to "explore", "walk through", "click around", "investigate the UI", or reproduce a user journey in a real browser before writing tests.
---

# Playwright MCP — Explore a live app

Use the **Playwright MCP** browser tools to explore an application interactively
and report back what you find. This is the reconnaissance step before generating
or debugging a test.

## Tools you will use

| Goal | Tool |
| --- | --- |
| Open a URL | `mcp__playwright__browser_navigate` |
| See the page (accessibility tree) | `mcp__playwright__browser_snapshot` |
| Click / type / select | `mcp__playwright__browser_click`, `browser_type`, `browser_fill_form`, `browser_select_option` |
| Wait for text/state | `mcp__playwright__browser_wait_for` |
| Read JS errors / logs | `mcp__playwright__browser_console_messages` |
| Inspect XHR/fetch | `mcp__playwright__browser_network_requests` |
| Capture an image | `mcp__playwright__browser_take_screenshot` |

## Method

1. **Snapshot first, always.** After every navigation or action, call
   `browser_snapshot` and act on the returned `ref`/role/name. The accessibility
   snapshot — not a screenshot — is the source of truth, because it gives stable
   roles and names that map directly to Playwright locators.
2. **Prefer accessible identifiers.** When you note an element, record its
   **role + accessible name** (e.g. `button "Login"`, `textbox "Username"`) so the
   finding translates straight into `getByRole` / `getByLabel`.
3. **Drive the real flow.** Perform the journey the user described step by step.
   After each step, verify the expected change appeared in the snapshot.
4. **Watch the side channels.** Check `browser_console_messages` for errors and
   `browser_network_requests` for failed or interesting API calls.
5. **Report, don't guess.** Summarize: the steps taken, the stable locators
   observed, any console/network anomalies, and (if relevant) a screenshot.

## Conventions for this repo

- The app under test defaults to `https://www.saucedemo.com` (`BASE_URL`).
- It exposes stable `data-test` attributes → these become `getByTestId(...)`
  (the suite sets `testIdAttribute: 'data-test'`).
- Credentials live in `typescript/src/data/users.ts` / `python/conftest.py`
  (demo user `standard_user` / `secret_sauce`).

## Output

Finish with a short, structured report:
- **Flow:** the ordered steps you performed.
- **Locators:** role/name (or test-id) for each element touched.
- **Observations:** console errors, slow/failed requests, surprises.
- **Next step suggestion:** e.g. "ready to generate a spec — run
  `playwright-generate-test`."

> Do not invent selectors. Everything you report must come from a real
> `browser_snapshot`.
