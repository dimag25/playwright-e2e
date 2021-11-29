import { test, expect } from '@playwright/test'



test.describe('ExecuteAutomation EAApp Site Test ', async () => {

    test('ConfigTest @E2E', async ({ page, browserName }) => {

        await test.step('Step 1: Open EAApp Site', async () => {
            await page.goto('http://eaapp.somee.com')
        });

        await test.step('Step 2: Perform Login', async () => {
            if(browserName === 'webkit'){
                await page.click('.navbar-toggle');
            }
            await page.click('text=Login');
            await page.type('#UserName', 'admin');
            await page.type('#Password', 'password');
        });

        await test.step('Step 3: Taking Screenshot', async () => {
            await page.screenshot({ path: 'EAApp.png', fullPage: true });
        });

    });

    test('Login click test @E2E', async ({ page, browserName }) => {

        await test.step('Step 1: Open EAApp Site', async () => {
            await page.goto('http://eaapp.somee.com')
        });

        await test.step('Step 2: Perform Login', async () => {
            if(browserName === 'webkit'){
                await page.click('.navbar-toggle');
            }
            await page.click('text=Login');
        });

        await test.step('Step 3: Taking Screenshot', async () => {
            await page.screenshot({ path: 'EAApp.png', fullPage: true });
        });

    });



})


