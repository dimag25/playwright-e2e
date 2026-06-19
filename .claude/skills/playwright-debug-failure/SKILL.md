---
name: playwright-debug-failure
description: Reproduce and diagnose a failing or flaky Playwright test using the Playwright MCP — replay the steps live, inspect the accessibility snapshot, console errors and network traffic to find the root cause, then propose a fix. Use when asked to "debug", "why is this test failing/flaky", "reproduce the failure", or "investigate a broken spec".
---

# Playwright MCP — Debug a failing test

Reproduce a failing/flaky test in a live browser through the MCP, find the root
cause, and propose a targeted fix.

## Steps

1. **Read the failing spec and its page objects** to understand the intended
   steps, locators, and assertions (`typescript/tests/**` + `src/pages/**`, or
   `python/tests/**` + `pages/**`).
2. **Replay the flow live** with the MCP, one action at a time:
   - `mcp__playwright__browser_navigate` to the start URL.
   - After each action (`browser_click`, `browser_type`, `browser_select_option`,
     `browser_fill_form`), call `mcp__playwright__browser_snapshot` and compare the
     actual roles/names/state against what the test expects.
3. **Pinpoint where reality diverges from the assertion.** Common causes:
   - Selector drift — the role/name/`data-test` changed. Confirm against the snapshot.
   - Timing — asserting before the app settled; check whether a
     `browser_wait_for` on text/state makes it pass (race, not a real bug).
   - App error — check `mcp__playwright__browser_console_messages` for JS errors.
   - Backend — check `mcp__playwright__browser_network_requests` for non-2xx or
     missing calls; reproduce edge cases with route mocking patterns from
     `typescript/tests/e2e/network-mocking.spec.ts`.
4. **Capture evidence:** a `browser_take_screenshot` and the relevant
   console/network excerpts at the point of failure.
5. **Classify the failure:**
   - *Real product bug* → report it with reproduction steps; do not weaken the test.
   - *Test bug / selector drift* → fix the locator or assertion in the page object.
   - *Flake (race)* → replace implicit timing with a web-first assertion or an
     explicit `expect(...).toBeVisible()` / `toHaveText()` wait — never add
     `waitForTimeout` or blanket retries.
6. **Verify the fix** by re-running the specific test:
   - TS: `cd typescript && npx playwright test <file> --project=chromium`
   - Py: `cd python && pytest <file> -q`
   - Inspect the trace if needed: `npx playwright show-trace <trace.zip>`.

## Output

Report: the failing step, the root cause (with snapshot/console/network
evidence), the classification, the exact change you made (or recommend), and the
command that now passes.
