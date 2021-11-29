import { test } from '@playwright/test';
import * as suiteData from "../../data/Regression.json";
import * as testData from "../../data/Test.json";
import Actions from '../utils/Actions';

test.describe('Suite: SuiteName', () => {
    for (let i = 0; i < Object.keys(suiteData).length - 1; i++) {
        if (suiteData[i].RunMode.toUpperCase() === 'YES') {
            test(suiteData[i].TC, async ({ page }) => {
                await page.goto('/samples/TestComplete15/smartstore/');
                let action = new Actions(page);
                for (let k = 0; k < Object.keys(testData).length - 1; k++)
                    if (testData[k].TC === suiteData[i].TC) {
                        for (let l = 0; l < Object.keys(testData[k].actions).length; l++) {
                            await test.step(testData[k].actions[l].Step, async () => {
                                await action.executeFunctionByFuncName(testData[k].actions[l].Action, testData[k].ClassName, testData[k].actions[l].Data);
                            });
                        }
                    }
            })
        } else {
            test(suiteData[i].TC, async () => {
                test.skip();
            })
        }
    };
});