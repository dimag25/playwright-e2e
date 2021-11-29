import { Page } from "@playwright/test";
import HomeSteps from "../steps/HomeSteps";
import LoginSteps from "../steps/LoginSteps";
import RegisterSteps from "../steps/RegisterSteps";
import BaseActions from "./BaseActions";

export default class RegisterActions extends BaseActions {
    
    private loginSteps: LoginSteps;
    private registerSteps: RegisterSteps;

    constructor(page: Page) {
        super(page);
        this.loginSteps = new LoginSteps(page);
        this.registerSteps = new RegisterSteps(page);
    }

    public async registerUser(data: string[]) {
        await this.homeSteps.navigateToLoginPage();
        await this.loginSteps.navigateToRegistrationPage();
        await this.registerSteps.enterRegistrationDetails(data[0], data[1], data[2], data[3], data[4],
            data[5], data[6], data[7], data[8]);
        await this.registerSteps.validateRegistrationSuccess(data[9]);
        await this.homeSteps.validateLoginSuccess();
        console.log("Successfully registered a user")
    }
}