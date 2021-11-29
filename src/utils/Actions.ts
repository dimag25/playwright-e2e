import { Page } from "@playwright/test";
import HomeActions from "../actions/HomeActions";
import IditActions from "../actions/IditActions";
import RegisterActions from "../actions/RegisterActions";

export default class Actions {
  private registerActions: RegisterActions;
  private homeActions: HomeActions;
  private iditActions: IditActions;

  constructor(page: Page) {
    this.iditActions = new IditActions(page);
    this.homeActions = new HomeActions(page);
    this.registerActions = new RegisterActions(page);
  }

  public async execute(action: string, data: string[]) {
    switch (action) {
      case "subscribeToNewsLetter":
        return await this.homeActions.subscribeToNewsLetter(data);
      case "unsubscribeToNewsLetter":
        return await this.homeActions.unsubscribeToNewsLetter(data);
      case "logout":
        return await this.homeActions.logout(data);
      case "login":
        return await this.homeActions.login(data);
      case "registerUser":
        return await this.registerActions.registerUser(data);
      default:
        throw new Error("Invalid Action " + action);
    }
  }

  // Execute function  by eval func : {class.functionName} with params.
  public async executeFunctionByFuncName(
    fname: string,
    className: string,
    fnParams: string[]
  ) {
    console.log("Executing Function : ", `${className}.${fname}`);

    // await eval(`this.${fname}`)(fnParams);
    if (className === "HomeActions") {
      await this.homeActions.evalFunction(fname, fnParams);
    } else if (className === "RegisterActions") {
      await this.registerActions.evalFunction(fname, fnParams);
    } else if (className === "IditActions") {
      await this.iditActions.evalFunction(fname, fnParams);
    } else {
      throw new Error("Invalid ClassName " + className);
    }
  }
}
