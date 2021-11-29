import { Page, expect } from "@playwright/test";
import BasePage from "./BasePage";
const faker = require("faker");
const email = faker.internet.email();
const password = faker.internet.password();
export default class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //All the UI elements of the Page
  userNameTextBox = async () =>
    this.Page.fill('[placeholder="Username"]', email);
  emailTextBox = async () => this.Page.fill('[placeholder="Email"]', email);
  passwordTextBox = async () =>
    this.Page.fill('[placeholder="Password"]', password);
  submitButton = async () => this.Page.locator('[type="submit"]');

  public async registerFlow() {
    await this.userNameTextBox();
    await this.emailTextBox();
    await this.passwordTextBox();
    await (await (this.submitButton())).click();
  }

  /**
   * verify register success flow.
   */
  public async verifyRegisterSuccess() {
    const userNameXpath =
      "body > app-root > app-layout-header > nav > div > ul > li:nth-child(4) > a";
    const userLoggedIn = await this.Page.innerText(userNameXpath);
    expect(userLoggedIn).toBe(email);
  }
}
