import  LoginPage  from "../../pages/LoginPage";
import  test  from "@playwright/test";
import * as loginData  from "../../../data/Login.json";

test.describe("Login / Logout Flow", async () => {
  let loginPage;

  test.beforeEach(async ({ context }) => {
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigateToHomePage("/");
  });

  test("should login & logout  application @E2E", async () => {
    await loginPage.loginFlow(loginData.username, loginData.password);
    await loginPage.verifyLoginSuccess();
    await loginPage.logoutFlow();
  });
  test("should try to login with invalid data @E2E", async () => {
    await loginPage.loginFlow("invalid username", "invalid password");
    await loginPage.verifyErrorMessage("Username and password do not match");
  })

  test("should try to locked out user @E2E", async () => {
    await loginPage.loginFlow("locked_out_user", "secret_sauce");
    await loginPage.verifyErrorMessage("Sorry, this user has been locked out.");
  })


});
