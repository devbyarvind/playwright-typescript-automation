import { Page, expect } from "@playwright/test";
import { LoginPage } from "../Page/login-page";

type LoginData = {
    email: string;
    password: string;
};

export class LoginAction {
    readonly loginPage_instance: LoginPage;

    constructor(page: Page) {
        this.loginPage_instance = new LoginPage(page);
    }

    async navigateUrl(url: string): Promise<void> {
        await this.loginPage_instance.page.goto(url);
        await this.loginPage_instance.page.waitForLoadState("load");
    }

    async clickLoginLink(): Promise<void> {
        await this.loginPage_instance.clickLoginLink.click();
    }

    async login(data: LoginData): Promise<void> {
        await this.loginPage_instance.emailInput.fill(data.email);
        await this.loginPage_instance.passwordInput.fill(data.password);
        await this.loginPage_instance.loginButton.click();
    }

    async verifyUserLoggedIn(expectedEmail: string): Promise<void> {
        await expect(this.loginPage_instance.accountEmail).toBeVisible();
        await expect(this.loginPage_instance.accountEmail).toHaveText(expectedEmail);
    }

    async verifyLogoutLink(): Promise<void> {
        await expect(this.loginPage_instance.logoutLink).toBeVisible();
    }

    async verifyErrorMessage(): Promise<void> {
    const errorSummary = this.loginPage_instance.page.locator(
        "//div[contains(@class,'validation-summary-errors')]"
    );
    const errorListItem = this.loginPage_instance.page.locator(
        "//div[contains(@class,'validation-summary-errors')]//li"
    );

    await expect(errorSummary).toBeVisible();
    await expect(errorSummary).toContainText("Login was unsuccessful");
    await expect(errorListItem).toContainText("No customer account found");
    }

    async verifyStaysOnLoginPage(): Promise<void> {
    await expect(this.loginPage_instance.page).toHaveURL(/.*\/login/);
    }

    
}