import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
globalTeardown:require.resolve('./global-teardown'),
use: {
baseURL: "https://www.saucedemo.com/",
headless: true,
channel: "chrome",
launchOptions: {
args: ["--start-maximized"],
// headless: true,
timeout: 5000,
slowMo: 1000,
},
viewport: null, //{ width: 1360, height: 760 },
ignoreHTTPSErrors: true,
actionTimeout: 30000,
navigationTimeout: 50000,
screenshot: 'on',
video: 'on',
trace: 'retain-on-failure'
},
testDir: './src/tests',
outputDir: './allure-results/results',
testMatch: '**/*.spec.ts',
// grep:[new RegExp("@API")],
// grep:[new RegExp("@E2E")],
retries: 0,
preserveOutput: 'always',
timeout: 30000,
workers: 5,
//shard: {total: 4, current: 2},
reporter: [['list'], ['allure-playwright'], ['junit', { outputFile: 'allure-results/results/results.xml' }],
['json', { outputFile: 'allure-results/results/results.json' }], ['./src/utils/TestListener.ts']]
};
export default config;