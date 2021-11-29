import { Page, expect } from "@playwright/test";
import RegisterPage from "../pages/RegressionPages/RegisterPage";

export default class RegisterSteps {

    private registerPage: RegisterPage;

    constructor(page: Page) {
        this.registerPage = new RegisterPage(page);
    }

    public async enterRegistrationDetails(gender: string, firstName: string, lastName: string, dob: string,
        email: string, userName: string, password: string, confirmPassword: string, company: string) {
        await this.registerPage.selectGender(gender);
        await this.registerPage.enterFirstName(firstName);
        await this.registerPage.enterLastName(lastName);
        let dobArray = dob.split("/");
        await this.registerPage.selectBirthDay(dobArray[0]);
        await this.registerPage.selectBirthMonth(dobArray[1]);
        await this.registerPage.selectBirthYear(dobArray[2]);
        let time = new Date().getTime().toString();
        email = email.replace('%s', time);
        await this.registerPage.enterEmail(email)
        userName = userName.replace('%s', time);
        await this.registerPage.enterUserName(userName);
        await this.registerPage.enterPassword(password);
        await this.registerPage.enterConfirmPassword(confirmPassword);
        await this.registerPage.enterCompany(company);
        await this.registerPage.checkNewsLetter();
        await this.registerPage.clickRegisterButton();
        return email;
    }

    public async validateRegistrationSuccess(message: string) {        
        expect(await this.registerPage.getRegisterSuccessMessage()).toBe(message);
    }
}