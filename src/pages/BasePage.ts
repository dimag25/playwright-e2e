import { Page } from "@playwright/test";

export default class BasePage {
  protected Page: Page;

  /**
   *
   */
  constructor(page) {
    this.Page = page;
  }

  /**
   * navigate to home page url
   * @param url
   */
   public async navigateToHomePage(url) {
    await this.Page.goto(url);
  }

  /**
   * wait for milisecond time.
   * @param ms
   */
   public async waitMiliSeconds(ms) {
    await this.Page.waitForTimeout(ms);
  }
}

export { BasePage };
