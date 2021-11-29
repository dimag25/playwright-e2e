import  HomePage  from "../../pages/HomePage";
import  LoginPage  from "../../pages/LoginPage";
import  test  from "@playwright/test";
import * as loginData  from "../../../data/Login.json";

test.describe("Login / Logout Flow", async () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ context }) => {
    const page = await context.newPage();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateToHomePage("/");
    await homePage.navigateToLogin();
    await loginPage.clearLoginTextBoxes();
  });

  test("should try to login with invalid data @E2E", async () => {
    await loginPage.loginFlow("invalid username", "invalid password");
    await loginPage.verifyErrorMessage("email or password is invalid");
  });

  test("should login & logout  application @E2E", async () => {
    await loginPage.loginFlow(loginData.username, loginData.password);
    await loginPage.verifyLoginSuccess();
    await loginPage.logoutFlow();
  });
});
