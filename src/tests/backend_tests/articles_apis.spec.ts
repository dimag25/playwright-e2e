import HomePage from "../../pages/HomePage";
import * as loginData from "../../../data/Login.json";
import LoginPage from "../../pages/LoginPage";
import test from "@playwright/test";

const baseAPIUrl = "https://conduit.productionready.io/api";

//body request for new article
const bodyRequest = {
  article: {
    tagList: [],
    title: "request from API",
    description: "API testing is easy",
    body: "Angular is cool",
  },
};

test.describe("API calls - flows (@API)", async () => {
  let page;
  let homePage;
  let loginPage;

  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateToHomePage("/");
    await homePage.navigateToLogin();
    await loginPage.loginFlow(loginData.username, loginData.password);
    await loginPage.verifyLoginSuccess();
  });

  test("Create new article in a global feed & validate it created (@API)", async () => {
    //request for login & create new articles
    await page.request(`${baseAPIUrl}/articles`, (route) => {
       route
        .fulfill({
          body: bodyRequest,
          status: 201,
        })
        .then((response: any) => {
          console.log(response);
        });
    });
  });
});
