import { Page } from "@playwright/test";

export default class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private loginLink = '#menubar-my-account span:has-text("Log in")';
    private userNameText = '#menubar-my-account .menubar-link>span';
    private logoutLink = '#menubar-my-account span:has-text("Log out")';
    private newsLetterEmailTextbox = '[name=NewsletterEmail]';
    private newsletterSubscribeButton = '#newsletter-subscribe-button';
    private subscriptionText = '#newsletter-result-block';    
    private unsubscribeRadioButton = '#newsletter-unsubscribe';

    public async open(uri) {
        await this.page.goto(uri);
    }

    public async clickLoginLink() {
        await this.page.click(this.loginLink);
    }

    public async clickMyAccountLink() {
        await this.page.click(this.userNameText);
    }

    public async clickLogoutLink() {
        await this.page.click(this.logoutLink);
    }

    public async isLoginLinkDisplayed() {
        return await (await this.page.waitForSelector(this.loginLink)).isVisible();
    }

    public async getLoggedInUserName() {
        let userName = await this.page.textContent(this.userNameText);
        console.log('Logged in as : ' + userName);
        return userName;
    }

    public async isUserNameDisplayed() {        
        return await (await this.page.waitForSelector(this.userNameText)).isVisible();
    }

    public async enterNewsLetterEmail(email: string) {
        this.page.fill(this.newsLetterEmailTextbox, email);    
    }

    public async clickNewsLetterSubscribeButton() {
        this.page.click(this.newsletterSubscribeButton);
    }

    public async clickNewsLetterUnsubscribeButton() {
        this.page.click(this.unsubscribeRadioButton);
    }

    public async getNewsLetterSuccessMessage() {
        let message = await (await this.page.waitForSelector(this.subscriptionText)).textContent();
        console.log('News Letter Message : ' + message);
        return message;
    }
}
