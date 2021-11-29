import { Page, expect } from "@playwright/test";
import LoginPage from "../pages/RegressionPages/LoginPage";

export default class LoginSteps{
       
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }

    public async login(userName: string, password: string) {
        await this.loginPage.enterUserName(userName);
        await this.loginPage.enterPassword(password);
        await this.loginPage.clickLoginButton();
    }

    public async navigateToRegistrationPage() {
        await this.loginPage.clickRegisterButton();
    }
}