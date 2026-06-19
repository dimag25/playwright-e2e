# Agent Skills — Playwright MCP workflows

These [Claude Code Agent Skills](https://docs.claude.com/en/docs/claude-code/skills)
teach AI agents how to use this repo's **Playwright MCP** server effectively.
Each `SKILL.md` is auto-discovered from `.claude/skills/` and invoked when its
`description` matches the user's request (or explicitly via `/<skill-name>`).

They pair with the MCP servers configured in [`../../.mcp.json`](../../.mcp.json)
— the skills supply the *playbook*, the Playwright MCP supplies the *browser*.

| Skill | When it triggers |
| --- | --- |
| [`playwright-explore`](playwright-explore/SKILL.md) | Explore / walk through a live flow via accessibility snapshots |
| [`playwright-generate-test`](playwright-generate-test/SKILL.md) | Turn an explored flow into a hardened POM spec (TS or Py) |
| [`playwright-a11y-audit`](playwright-a11y-audit/SKILL.md) | Run an axe-core WCAG audit on a live page |
| [`playwright-debug-failure`](playwright-debug-failure/SKILL.md) | Reproduce & diagnose a failing/flaky test |
| [`playwright-visual-baseline`](playwright-visual-baseline/SKILL.md) | Preview, author & update visual / ARIA snapshots |

## Typical agentic loop

```
explore → generate-test → (run) → debug-failure → visual-baseline
```

1. **Explore** the app live to discover stable locators.
2. **Generate** a deterministic spec that follows the repo's conventions.
3. **Debug** any failure by replaying it in the MCP browser.
4. **Baseline** the visual/ARIA assets once the flow is correct.

## Using them

In Claude Code from the repo root (which loads `.mcp.json`):

```
/playwright-explore     # or just describe the task in natural language
"Explore the saucedemo checkout flow and generate a Playwright test for it."
```

The agent will combine the matching skill's playbook with the live
`mcp__playwright__*` browser tools.
