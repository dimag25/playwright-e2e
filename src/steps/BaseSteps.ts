import { test as baseTest } from "@playwright/test";
import HomeSteps from "./HomeSteps";
import LoginSteps from "./LoginSteps";
import RegisterSteps from "./RegisterSteps";

export const test = baseTest.extend<{
    homeSteps: HomeSteps;
    loginSteps: LoginSteps;
    registerSteps: RegisterSteps;
}>({
    homeSteps: async ({ page }, use) => { await use(new HomeSteps(page)); },
    loginSteps: async ({ page }, use) => { await use(new LoginSteps(page)); },
    registerSteps: async ({ page }, use) => { await use(new RegisterSteps(page));},
})
export const expect = test.expect;