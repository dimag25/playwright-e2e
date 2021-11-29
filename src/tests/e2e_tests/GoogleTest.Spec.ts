import { test, expect } from '@playwright/test'


test.use({
    browserName: 'chromium'
});

test.describe('Google WebSite Test @E2E' , async () => {

    test('Google Search test', async ({ page, browserName }) => {

        await page.goto('https://www.google.com/');
        await page.type('input[name="q"]', 'playwright');
            await page.click('input[name="btnK"]');
        await page.screenshot({ path: 'google.png', fullPage: true });

    });

})


