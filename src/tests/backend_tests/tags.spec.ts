import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import test, { expect, Page } from "@playwright/test";
import * as tagsJson from "../../../data/tags.json";
test.describe("Mocking  tags api data (@API)", () => {
  let page: Page;
  let homePage: HomePage;
  test.beforeEach(async ({ context }) => {
    page = await context.newPage();
    homePage = new HomePage(page);
    await homePage.navigateToHomePage("/");
    await page.route("**/api/tags", (route) =>
      route.fulfill({
        body: JSON.stringify(tagsJson),
        status: 200,
        contentType: "application/json",
        headers: {
          "sec-fetch-mode": "cros",
          "sec-fetch-site": "same-site",
          origin: null,
          referer: "https://angular.realworld.io",
          method: "GET",
        },
      })
    );
  });
  test.skip("should have tags list with routing object @test", async () => {
    await homePage.navigateToHomePage("/");
    const tagList = await page.locator(".tag-list");
    await expect(tagList).toHaveText(["cypress", "test", "automation"]);
  });
});
