import { Page } from "@playwright/test";

export default class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private userNameTextbox = '#UsernameOrEmail';
    private passwordTextbox = '[name=Password]';
    private loginButton = 'button:has-text("Log in")';
    private registerButton = '.register-button';

    public async enterUserName(userName: string) {
        await this.page.fill(this.userNameTextbox, userName);
    }
    
    public async enterPassword(password: string) {
        await this.page.fill(this.passwordTextbox, password);
    }
    
    public async clickLoginButton() {
        await this.page.click(this.loginButton);
    }

    public async clickRegisterButton() {
        await this.page.click(this.registerButton);
    }
}
