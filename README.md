# 🎭 Playwright E2E — TypeScript + Python + MCP

A modern, batteries-included end-to-end testing reference framework built on
**Playwright 1.61** (June 2026). It showcases current best practices in **both
TypeScript and Python**, ships ready-to-run CI, and is wired up for **AI agents
via the Model Context Protocol (MCP)**.

The suite tests the public [Sauce Demo](https://www.saucedemo.com) app and a
public sandbox API, so you can clone and run it immediately.

[![Playwright (TypeScript)](https://github.com/dimag25/playwright-e2e/actions/workflows/playwright-typescript.yml/badge.svg)](https://github.com/dimag25/playwright-e2e/actions/workflows/playwright-typescript.yml)
[![Playwright (Python)](https://github.com/dimag25/playwright-e2e/actions/workflows/playwright-python.yml/badge.svg)](https://github.com/dimag25/playwright-e2e/actions/workflows/playwright-python.yml)

---

## ✨ What's inside

| Area | Highlights |
| --- | --- |
| **Locators** | Role / test-id / label locators only — no `page.$()` ElementHandles |
| **Page Object Model** | Clean POM in both languages with a shared `BasePage` |
| **Fixtures** | Custom fixtures inject page objects; shared auth via `storageState` |
| **Auth** | Log in once in a `setup` project, reuse the session everywhere |
| **API testing** | Browserless `request` context tests + JSON assertions |
| **Network mocking** | `page.route` interception & response stubbing |
| **Visual & ARIA** | `toMatchAriaSnapshot` + pixel screenshots |
| **Accessibility** | axe-core scans (WCAG 2.1 A/AA) in both stacks |
| **Reporting** | HTML report, blob reports merged across shards, GitHub annotations |
| **CI** | Sharded GitHub Actions, lint + typecheck gates, browser caching |
| **Containers** | Pinned Playwright Docker images + `docker compose` |
| **AI / MCP** | Playwright, Filesystem & GitHub MCP servers ([docs](docs/MCP.md)) |

## 📁 Repository layout

```
.
├── typescript/            # Playwright Test (TS) project
│   ├── src/
│   │   ├── pages/         # Page objects (BasePage, Login, Inventory, Cart)
│   │   ├── fixtures/      # Custom test fixtures (inject page objects)
│   │   ├── data/          # Typed test data
│   │   └── utils/         # Faker-backed test-data helpers
│   ├── tests/
│   │   ├── setup/         # auth.setup.ts → shared storageState
│   │   ├── e2e/           # UI flows + network mocking
│   │   ├── api/           # API-only tests
│   │   ├── visual/        # ARIA + screenshot snapshots
│   │   └── accessibility/ # axe-core scans
│   └── playwright.config.ts
├── python/                # pytest-playwright project
│   ├── pages/             # Page objects
│   ├── tests/             # test_login / test_cart / test_api / a11y
│   ├── conftest.py        # Fixtures (page objects, logged_in helper)
│   └── pyproject.toml
├── .github/workflows/     # CI for both stacks
├── .mcp.json              # MCP servers for AI agents
└── docs/                  # MCP & best-practices guides
```

## 🚀 Quick start — TypeScript

```bash
cd typescript
npm install
npx playwright install --with-deps

npm test                 # run everything
npm run test:ui          # interactive UI mode (time-travel debugging)
npm run test:smoke       # only @smoke-tagged tests
npm run test:e2e         # only @e2e
npm run test:api         # API project
npm run report           # open the last HTML report
npm run codegen          # record a new test
```

Update visual / ARIA baselines: `npm test -- --update-snapshots`.

## 🐍 Quick start — Python

```bash
cd python
pip install -r requirements.txt
python -m playwright install --with-deps chromium

pytest                       # run everything (headless chromium)
pytest -m smoke              # only smoke tests
pytest -m api                # API tests
pytest --headed --slowmo 500 # watch it run
pytest -n auto               # parallel across CPU cores
```

## 🤖 AI agents via MCP

This repo is agent-ready. With Claude Code (or any MCP client) the
[`.mcp.json`](.mcp.json) config exposes a **Playwright MCP** server so an agent
can drive a real browser through accessibility snapshots — explore flows,
reproduce bugs, and draft new tests — plus Filesystem and GitHub servers.

```bash
claude            # from repo root; reads .mcp.json automatically
# then: "Use the playwright MCP to log into saucedemo and add a backpack to the cart."
```

See [docs/MCP.md](docs/MCP.md) for details and more server ideas.

## 🐳 Docker

```bash
docker compose run --rm typescript
docker compose run --rm python
```

## 📚 Further reading

- [docs/BEST_PRACTICES.md](docs/BEST_PRACTICES.md) — the conventions this repo follows
- [docs/MCP.md](docs/MCP.md) — Model Context Protocol integration
- [Playwright docs](https://playwright.dev)

## 📄 License

MIT
