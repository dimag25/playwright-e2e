---
name: playwright-a11y-audit
description: Run an accessibility audit on a live page using the Playwright MCP — inject axe-core, collect WCAG violations, and report grouped findings with severity and remediation. Use when asked to "audit accessibility", "check a11y/WCAG", "find accessibility issues", or "run axe" on a page.
---

# Playwright MCP — Accessibility audit

Audit a live page for accessibility violations by running **axe-core** inside the
MCP-controlled browser, then report actionable findings.

## Steps

1. **Open the page** with `mcp__playwright__browser_navigate`. If the target is
   behind auth, perform login first (see `playwright-explore`).
2. **Snapshot** with `mcp__playwright__browser_snapshot` to confirm the page is
   in the intended state before auditing.
3. **Run axe-core** via `mcp__playwright__browser_evaluate`. Load axe from CDN and
   execute it:

   ```js
   async () => {
     if (!window.axe) {
       await new Promise((resolve, reject) => {
         const s = document.createElement('script');
         s.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
         s.onload = resolve;
         s.onerror = reject;
         document.head.appendChild(s);
       });
     }
     const results = await window.axe.run(document, {
       runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
     });
     return results.violations.map(v => ({
       id: v.id,
       impact: v.impact,
       help: v.help,
       helpUrl: v.helpUrl,
       nodes: v.nodes.map(n => n.target).slice(0, 5),
     }));
   }
   ```

4. **Report** the violations grouped by `impact`
   (critical → serious → moderate → minor), each with: rule id, description, the
   affected selectors, and the `helpUrl`. State the total count up front.
5. **Recommend fixes** for the top issues and, if the user wants enforcement,
   point them at the committed regression tests:
   - TS: `typescript/tests/accessibility/a11y.spec.ts` (uses `@axe-core/playwright`)
   - Py: `python/tests/test_accessibility.py` (uses `axe-playwright-python`)

## Notes

- Audit one logical page/state at a time; re-run after each fix to confirm.
- `wcag2a`/`wcag2aa` are the baseline; add `best-practice` tags only if asked.
- This live audit complements — it does not replace — the committed axe tests in
  the suite, which gate regressions in CI.
