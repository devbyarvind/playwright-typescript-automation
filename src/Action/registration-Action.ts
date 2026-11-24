import { Page } from "@playwright/test";
import { UserRegistrationPage } from "../Page/registration-page";

type RegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export class UserRegistrationAction {
    readonly registrationpage_instance: UserRegistrationPage;

    constructor(page: Page) {
        this.registrationpage_instance = new UserRegistrationPage(page);}   

    async navigateUrl(url: string): Promise<void> {
        await this.registrationpage_instance.page.goto(url);
        await this.registrationpage_instance.page.waitForLoadState("load");
    }

    async VerifyDashboardTitile(): Promise<void> {
        await this.registrationpage_instance.verifyDashTitle.isVisible();
    }

    async clickRegister(): Promise<void> {
        await this.registrationpage_instance.clickRegisterLink.isVisible();
        await this.registrationpage_instance.clickRegisterLink.click();
    }

    async verifyTitleForm(): Promise<void> {
        await this.registrationpage_instance.verifyFormTitle.isVisible();
    }

    async selectGenderMale(): Promise<void> {
        await this.registrationpage_instance.verifyGender.check();
    }

    async completeRegistration(data: RegistrationData): Promise<void> {
        await this.registrationpage_instance.FirstName.fill(data.firstName);
        await this.registrationpage_instance.LastName.fill(data.lastName);
        await this.registrationpage_instance.Email.fill(data.email);
        await this.registrationpage_instance.Password.fill(data.password);
        await this.registrationpage_instance.ConfirmPassword.fill(data.confirmPassword);

        await this.registrationpage_instance.RegisterButton.click();
    }
}