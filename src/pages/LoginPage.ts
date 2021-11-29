import { Page } from "playwright-core";

import { expect } from "@playwright/test";
import loginData from "../../data/Login.json";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //All the UI elements of the Page
  emailTextBox = async () => this.Page.$('[placeholder="Email"]');
  passwordTextBox = async () => this.Page.$('[placeholder="Password"]');
  submitButton = async () => this.Page.$('[type="submit"]');

  /**
    * static loginFlow
    @param userName:string, 
    @param password: string 
    */
    public async loginFlow(userName: string, password: string) {
    await (await this.emailTextBox()).fill(userName);
    await (await this.passwordTextBox()).fill(password);
    await (await this.submitButton()).click();
  }

  public async clearLoginTextBoxes() {
    await (await this.emailTextBox()).fill("");
    await (await this.passwordTextBox()).fill("");
  }

  /**
   * verify login success flow.
   */
   public async verifyLoginSuccess() {
    const userNameXpath =
      "body > app-root > app-layout-header > nav > div > ul > li:nth-child(4) > a";
    const userLoggedIn = await this.Page.innerText(userNameXpath);
    await expect(userLoggedIn).toBe("dimag@test.com");
  }

  public async verifyErrorMessage(message) {
    const isVisibleError = await this.Page.isVisible(".error-messages");
    expect(isVisibleError).toBeTruthy();
    const errorcontent = await this.Page.innerText(".error-messages");
    expect(errorcontent).toBe(message);
  }

  public async logoutFlow() {
    const userNameXpath =
      "body > app-root > app-layout-header > nav > div > ul > li:nth-child(4) > a";
    await this.Page.click(userNameXpath);
    await this.Page.click('text="Edit Profile Settings"');
    await this.Page.click('text="Or click here to logout."');
    expect(await this.Page.isVisible("text=Sign in")).toBeTruthy();
  }
}

// export { LoginPage };
