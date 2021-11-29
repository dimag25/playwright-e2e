import { Page } from "@playwright/test";
import HomeSteps from "../steps/HomeSteps";

export default class BaseActions {
  protected homeSteps: HomeSteps;

  constructor(page: Page) {
    this.homeSteps = new HomeSteps(page);
  }

  //eval function by name
  public async evalFunction(fname: string, fnParams: string[]) {
    await this[`${fname}`](fnParams);
  }

  public async logout(data: string[]) {
    await this.homeSteps.logout();
    console.log("Logout success");
  }
}
