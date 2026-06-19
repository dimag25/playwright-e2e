# Model Context Protocol (MCP) Integration

This repo is wired up to use [MCP](https://modelcontextprotocol.io) servers so
that AI agents (Claude Code, Cursor, VS Code Copilot, etc.) can drive the
browser, read the codebase, and interact with GitHub — turning the repository
into an **agent-friendly testing workbench**.

The configuration lives in [`.mcp.json`](../.mcp.json) at the repo root. Claude
Code auto-discovers this file; other clients can point at the same server
definitions.

## Configured servers

### 1. Playwright MCP (`@playwright/mcp`) — the headline integration

The official [Playwright MCP server](https://github.com/microsoft/playwright-mcp)
exposes the browser to an LLM through **structured accessibility snapshots**
(not screenshots), so the agent acts on real, deterministic elements.

What you can ask an agent to do:

- _"Open saucedemo.com, log in as `standard_user`, and add a backpack to the cart."_
- _"Explore the checkout flow and generate a Playwright test for it."_
- _"Navigate the app and report any accessibility issues."_

We run it `--headless --isolated` so each agent session gets a clean browser
profile with no persisted state — ideal for CI and reproducible runs.

Run it standalone:

```bash
npx @playwright/mcp@latest          # interactive
npx @playwright/mcp@latest --help   # all flags (devices, viewport, storage, etc.)
```

Useful flags: `--device "iPhone 15"`, `--viewport-size 1280,720`,
`--save-trace`, `--storage-state ./auth.json`, `--allowed-origins`.

### 2. Filesystem MCP (`@modelcontextprotocol/server-filesystem`)

Scoped read/write access to this repository so an agent can read page objects,
follow conventions, and scaffold new specs that match the existing style.

### 3. GitHub MCP (`@modelcontextprotocol/server-github`)

Lets an agent open PRs, triage issues, and inspect CI runs. Requires a
`GITHUB_PERSONAL_ACCESS_TOKEN` — your client will prompt for it (never commit
the token).

## Other MCP servers worth adding

Depending on your workflow, these complement an E2E testing repo well:

| Server | Why it helps here |
| --- | --- |
| **Sequential Thinking** | Structured multi-step planning for complex test scenarios. |
| **Fetch / Web** | Pull live API responses or docs to build data-driven tests. |
| **Postgres / SQLite** | Seed and assert on a database during E2E flows. |
| **Allure / TestRail** (community) | Push results to test-management tooling. |
| **Slack** | Post run summaries / failures to a channel. |

Add any of them as another entry under `mcpServers` in `.mcp.json`.

## Using it from Claude Code

```bash
# From the repo root — Claude Code reads .mcp.json automatically.
claude
# Then, in session:
#   /mcp           → list connected servers & tools
#   "Use the playwright MCP to log into saucedemo and screenshot the inventory."
```

> Tip: The agent driving the Playwright MCP and the deterministic tests in
> `typescript/` and `python/` are complementary — let the agent _explore and
> draft_, then commit the hardened, reviewed spec into the suite.
