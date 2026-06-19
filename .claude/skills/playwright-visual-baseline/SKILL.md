---
name: playwright-visual-baseline
description: Capture, review, and update visual & ARIA snapshots for this Playwright suite. Use the MCP to preview a page's accessibility tree / screenshot before committing baselines, then generate them deterministically with the test runner. Use when asked to "update snapshots", "create visual baselines", "review a visual diff", or "add an ARIA snapshot".
---

# Playwright MCP — Visual & ARIA baselines

Help manage the suite's visual regression assets: pixel screenshots
(`toHaveScreenshot`) and ARIA snapshots (`toMatchAriaSnapshot`).

## Preview live with the MCP (before committing anything)

1. `mcp__playwright__browser_navigate` to the target page/state.
2. `mcp__playwright__browser_snapshot` — read the accessibility tree. This is
   exactly the structure an ARIA snapshot asserts, so use it to author or sanity-
   check the expected YAML (roles, names, `[selected]`/`[checked]` states).
3. `mcp__playwright__browser_take_screenshot` — eyeball the visual you're about
   to baseline so you don't freeze a broken layout.

## Author an ARIA snapshot (resolution-independent, preferred)

In a `@visual` spec, assert against the snapshot you just previewed:

```ts
await expect(page.getByTestId('product-sort-container')).toMatchAriaSnapshot(`
  - combobox:
    - option "Name (A to Z)" [selected]
    - option "Name (Z to A)"
`);
```

Keep snapshots minimal and meaningful — assert the structure that matters, not
the entire tree.

## Generate / update baselines deterministically

The committed baselines must come from the **test runner**, not the MCP, so they
match CI's rendering. Screenshot baselines are environment-specific.

```bash
cd typescript
# Generate or refresh all snapshots:
npm test -- --update-snapshots
# Scope to one file/project for a clean diff:
npx playwright test tests/visual --project=chromium --update-snapshots
```

- ARIA snapshot baselines: `*.aria.yml` next to the spec (or inline strings).
- Screenshot baselines: `tests/**/<spec>-snapshots/*.png`.

## Reviewing a diff

1. `npm run report` (or open `playwright-report/`) to view the side-by-side
   expected / actual / diff.
2. Decide intentionally:
   - *Intended UI change* → re-run with `--update-snapshots` and commit the new
     baseline, calling out the change.
   - *Regression* → do **not** update; report the diff as a failure.

## CI note

`@visual` is excluded from the default CI run until baselines are committed
(see `.github/workflows/playwright-typescript.yml`). After committing baselines
on the CI platform (or a matching container), remove the `--grep-invert @visual`
filter to gate on them.
