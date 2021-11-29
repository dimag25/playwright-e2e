import { Page } from "@playwright/test";
import LoginSteps from "../steps/LoginSteps";
import BaseActions from "./BaseActions";

export default class IditActions extends BaseActions {

    private loginSteps: LoginSteps;
    private page:Page;
    constructor(page: Page) {
      super(page);
      this.page = page;
      this.loginSteps = new LoginSteps(page);
    }

    
    public async loginToIDIT(data: string[]){
        await this.loginSteps.login(data[0], data[1]);
        await this.homeSteps.validateLoginSuccess();
        console.log("Login Success");
      }

      public async createNewContact(data : string []){
        // Click #NewMainMenu
        await this.page.click('#NewMainMenu');
        // Click text=Find Contact Policy Risk Object Contact Policy Quote Policy & Quote Claim Accoun
        await this.page.click('text=Find Contact Policy Risk Object Contact Policy Quote Policy & Quote Claim Accoun');
        // Click #NewMainMenu
        await   this.page.click('#NewMainMenu');
        // Click text=New Contact
        await  this.page.click('text=New Contact')
        // Click b[role="presentation"]
        // Click div[role="option"]:has-text("Individual")
        await this.page.selectOption('div[role="option"]','Individual');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click input[name="IDITForm@firstName"]
        await this.page.click('input[name="IDITForm@firstName"]');
        // Fill input[name="IDITForm@firstName"]
        await this.page.fill('input[name="IDITForm@firstName"]', 'firstName');
        // Press Tab
        await this.page.press('input[name="IDITForm@firstName"]', 'Tab');
        // Fill input[name="IDITForm@name"]
        await this.page.fill('input[name="IDITForm@name"]', 'lastName');
        // Fill text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]
        await this.page.fill('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]', '1');
        // Click text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]
        await this.page.click('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]');
        // Fill text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]
        await this.page.fill('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@zipCode"]', '12345');
        // Click text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]
        await this.page.click('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]');
        // Fill text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]
        await this.page.fill('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]', 'c');
        // Click text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]
        await this.page.click('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]');
        // Fill text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]
        await this.page.fill('text=Post Code City District >> input[name="IDITForm@primaryAddressForDisplay@addressVO@cityName"]', 'city');
        // Click text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@streetName"]
        await this.page.click('text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@streetName"]');
        // Fill text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@streetName"]
        await this.page.fill('text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@streetName"]', 'street');
        // Click text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@houseNr"]
        await this.page.click('text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@houseNr"]');
        // Fill text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@houseNr"]
        await this.page.fill('text=Post Code City District Street Name House Number Addition POB 2nd Address Line H >> input[name="IDITForm@primaryAddressForDisplay@addressVO@houseNr"]', '25');
        // Click text=Next
        await this.page.click('text=Next');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click button:has-text("OK")
        await this.page.click('button:has-text("OK")');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click button:has-text("OK")
        await this.page.click('button:has-text("OK")');
        // Click #select2-chosen-3
        await this.page.click('#select2-chosen-3');
        // this.page #select2-result-label-23
        await this.page.click('#select2-result-label-23');
        // Click text=Next
        await this.page.click('text=Next');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click button:has-text("OK")
        await this.page.click('button:has-text("OK")');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click text=Finish
        await this.page.click('text=Finish');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click button:has-text("OK")
        await this.page.click('button:has-text("OK")');
        // assert.equal(page.url(), 'http://10.86.0.6:9001/idit-web/contact_manager//contactNewGen.do');
        // Click b:has-text("firstName lastName , # 25871")
        await this.page.click('b:has-text("firstName lastName")');

      }
    
}