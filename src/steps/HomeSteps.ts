import { Page, expect } from "@playwright/test";
import HomePage from "../pages/RegressionPages/HomePage";

export default class HomeSteps{
       
    private homePage: HomePage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
    }

  

    public async launchApplication(appURI: string) {
        await this.homePage.open(appURI);
    }

    public async navigateToLoginPage() {
        await this.homePage.clickLoginLink();        
    }

    public async validateLoginSuccess() {  
        await this.homePage.getLoggedInUserName();
        expect(await this.homePage.isUserNameDisplayed()).toBeTruthy();
    }

    public async logout() {
        await this.homePage.clickMyAccountLink();
        await this.homePage.clickLogoutLink();        
        expect(await this.homePage.isLoginLinkDisplayed()).toBeTruthy();
    }

    public async subscribe(email: string) {
        await this.homePage.enterNewsLetterEmail(email);
        await this.homePage.clickNewsLetterSubscribeButton();
    }
    
    public async unsubscribe(email: string) {
        await this.homePage.clickNewsLetterUnsubscribeButton();
        await this.subscribe(email);
    }
    
    public async validateNewsLetterMessage(message: string) {
        expect(await this.homePage.getNewsLetterSuccessMessage()).toBe(message);
    }
}