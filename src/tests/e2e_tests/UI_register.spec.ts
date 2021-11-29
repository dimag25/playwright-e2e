import HomePage from "../../pages/HomePage";
import RegisterPage from "../../pages/RegisterPage";
import { test, expect } from "@playwright/test";

test.describe("Register flow UI- (E2E)", async () => {
  let homePage;
  let registerPage;

  test("Should try to register with Valid data @E2E", async ({ context }) => {
    const page = await context.newPage();
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    await homePage.navigateToHomePage("/");
    await homePage.navigateToRegister();

    await test.step("Register with valid data", async () => {
      await registerPage.registerFlow();
    });

    await test.step("Validate registeration succeeded", async () => {
      await registerPage.verifyRegisterSuccess();
    });
  });
});
