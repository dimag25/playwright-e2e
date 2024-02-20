import { expect, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //All the UI elements of the Page.
  userNameTextBox = async () => this.Page.$("[data-test='username']");
  passwordTextBox = async () => this.Page.$("[data-test='password']");
  submitButton = async () => this.Page.$("[data-test='login-button']");
  error_message = async () => this.Page.$("[data-test='error']");

  /**
    * static loginFlow
    @param userName:string, 
    @param password: string 
    */
    public async loginFlow(userName: string, password: string) {
    await (await this.userNameTextBox()).fill(userName);
    await (await this.passwordTextBox()).fill(password);
    await (await this.submitButton()).click();
  }

  public async clearLoginTextBoxes() {
    await (await this.userNameTextBox()).fill("");
    await (await this.passwordTextBox()).fill("");
  }

  /**
   * verify login success flow.
   */
   public async verifyLoginSuccess() {
    const isVisibleUserMenu = await this.Page.isVisible(".bm-burger-button");
    expect(isVisibleUserMenu).toBeTruthy();
  }

  public async verifyErrorMessage(message) {
    const isVisibleError = await this.Page.isVisible("[data-test='error']");
    expect(isVisibleError).toBeTruthy();
    const errorcontent = await this.Page.innerText("[data-test='error']");
    expect(errorcontent).toContain(message);
  }

  public async logoutFlow() {
    const menu_button =".bm-burger-button";
    await this.Page.click(menu_button);
    await this.Page.click('text="Logout"');
    expect(await this.Page.isVisible("text=Login")).toBeTruthy();
  }
}