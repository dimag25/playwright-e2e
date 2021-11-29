import { Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
  //All the UI elements of the Page
  loginTab = async () => this.Page.$('text="Sign in"');
  homeTab = async () => this.Page.$('text="Home');
  globalFeedTab = async () => this.Page.$('text="Global Feed"');
  registerTab = async () => this.Page.$('text="Sign up"');

  constructor(page: Page) {
    super(page);
  }
  public async navigateToLogin() {
    await (await this.loginTab()).click();
  }

  /**
   * navigate to home page tab
   */
   public async navigateToHomeTab() {
    await (await this.homeTab()).click();
  }

  public async navigateToGlobalFeed() {
    await (await this.globalFeedTab()).click();
  }

  public async navigateToRegister() {
    await (await this.registerTab()).click();
  }
}
// export { HomePage };
