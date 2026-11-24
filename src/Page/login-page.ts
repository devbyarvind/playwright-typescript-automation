import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly clickLoginLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly accountEmail: Locator;
    readonly logoutLink: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.clickLoginLink = page.locator("//a[@class='ico-login']");
        this.emailInput = page.locator("//input[@id='Email']");
        this.passwordInput = page.locator("//input[@id='Password']");
        this.loginButton = page.locator("//input[@class='button-1 login-button']");
        this.accountEmail = page.locator("//a[@class='account' and contains(text(),'user')]");
        this.logoutLink = page.locator("//a[@class='ico-logout']");
        this.errorMessage = page.locator("//div[contains(@class,'validation-summary-errors')]//li");
    }
}