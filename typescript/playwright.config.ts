import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from a local .env file when present.
 * See {@link https://playwright.dev/docs/test-parameterize}.
 */
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const IS_CI = !!process.env.CI;

/**
 * Modern Playwright configuration (v1.61+).
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel. */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source. */
  forbidOnly: IS_CI,
  /* Retry on CI only. */
  retries: IS_CI ? 2 : 0,
  /* Opt out of parallel workers on CI for stability; use all cores locally. */
  workers: IS_CI ? '50%' : undefined,
  /* Limit the failures on CI to fail fast. */
  maxFailures: IS_CI ? 10 : undefined,
  /* Per-test timeout. */
  timeout: 30_000,
  /* Global expect() assertion timeout. */
  expect: {
    timeout: 7_500,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  /* Reporters: rich HTML locally, blob on CI for sharding/merge, GitHub annotations. */
  reporter: IS_CI
    ? [
        ['list'],
        ['blob'],
        ['github'],
        ['json', { outputFile: 'test-results/results.json' }],
      ]
    : [['list'], ['html', { open: 'never' }]],

  /* Shared settings for all the projects below. */
  use: {
    baseURL: BASE_URL,
    /* Saucedemo (and this repo) use the `data-test` attribute for stable selectors. */
    testIdAttribute: 'data-test',
    /* Collect trace on first retry — best balance of insight vs. overhead. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: true,
    locale: 'en-US',
    timezoneId: 'UTC',
  },

  /* Configure projects for major browsers and a shared auth setup. */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testIgnore: '**/tests/api/**',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      testIgnore: '**/tests/api/**',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      testIgnore: '**/tests/api/**',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'mobile-chrome',
      testIgnore: '**/tests/api/**',
      use: {
        ...devices['Pixel 7'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    /* API tests need no browser and no auth storage state. */
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],
});
