import { Page } from "@playwright/test";
import HomeSteps from "../steps/HomeSteps";
import LoginSteps from "../steps/LoginSteps";
import BaseActions  from "./BaseActions";

export default class HomeActions extends BaseActions {

  // public async evalFunction(fname: string, fnParams: string[]) {
  //   // await eval ('this.'+fname)(fnParams);
  //     await this[`${fname}`](fnParams);
  // }

  private loginSteps: LoginSteps;

  constructor(page: Page) {
    super(page);
    this.loginSteps = new LoginSteps(page);
  }

  public async login(data: string[]) {
    await this.homeSteps.navigateToLoginPage();
    await this.loginSteps.login(data[0], data[1]);
    await this.homeSteps.validateLoginSuccess();
    console.log("Login Success");
  }

  public async subscribeToNewsLetter(data: string[]) {
    await this.homeSteps.subscribe(data[0]);
    await this.homeSteps.validateNewsLetterMessage(data[1]);
    console.log("Subscribed " + data[0] + " to newsletters");
  }

  public async unsubscribeToNewsLetter(data: string[]) {
    await this.homeSteps.unsubscribe(data[0]);
    await this.homeSteps.validateNewsLetterMessage(data[1]);
    console.log("Unsubscribed " + data[0] + " to newsletters");
  }
}
