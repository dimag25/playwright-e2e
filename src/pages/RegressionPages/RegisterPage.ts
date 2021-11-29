import { Page } from "@playwright/test";

export default class RegisterPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private genderRadioButton = '#gender-%s';
    private firstNameTextbox = '#FirstName';
    private lastNameTextbox = '#LastName';
    private dateOfBirthDayDropdown = '[name=DateOfBirthDay]';
    private dateOfBirthMonthDropdown = '[name=DateOfBirthMonth]';
    private dateOfBirthYearDropdown = '[name=DateOfBirthYear]';
    private emailTextbox = '#Email';
    private userNameTextbox = '#Username';
    private passwordTextbox = '[name=Password]';
    private confirmPasswordTextbox = '#ConfirmPassword';
    private companyTextbox = '#Company';
    private newsletterCheckbox = '#Newsletter'
    private registerButton = '[name=register-button]';
    private registerSuccessText = '.registration-result-page p';

    public async selectGender(gender: string) {
        await this.page.click(this.genderRadioButton.replace('%s', gender.toLowerCase()));
    }

    public async enterFirstName(firstName: string) {
        await this.page.fill(this.firstNameTextbox, firstName);
    }

    public async enterLastName(lastName: string) {
        await this.page.fill(this.lastNameTextbox, lastName);
    }

    public async selectBirthDay(day: string) {
        await this.page.selectOption(this.dateOfBirthDayDropdown, { label: day });
    }

    public async selectBirthMonth(month: string) {
        await this.page.selectOption(this.dateOfBirthMonthDropdown, { value: month });
    }

    public async selectBirthYear(year: string) {
        await this.page.selectOption(this.dateOfBirthYearDropdown, { label: year });
    }

    public async enterEmail(email: string) {
        await this.page.fill(this.emailTextbox, email);
    }

    public async enterUserName(userName: string) {
        await this.page.fill(this.userNameTextbox, userName);
    }
    
    public async enterPassword(password: string) {
        await this.page.fill(this.passwordTextbox, password);
    }
    
    public async enterConfirmPassword(confirmPassword: string) {
        await this.page.fill(this.confirmPasswordTextbox, confirmPassword);
    }

    public async enterCompany(company: string) {
        await this.page.fill(this.companyTextbox, company);
    }

    public async checkNewsLetter() {
        await this.page.check(this.newsletterCheckbox);
    }

    public async clickRegisterButton() {
        await this.page.click(this.registerButton);
    }

    public async getRegisterSuccessMessage() {
        let msg = await (await (await this.page.waitForSelector(this.registerSuccessText)).textContent()).trim();
        console.log('Registration Message: '+msg);
        return msg;
    }
}
