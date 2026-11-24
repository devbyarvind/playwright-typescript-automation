import { Page, expect } from "@playwright/test";
import { CheckoutPage } from "../Page/checkout-page";
import registrationData from "../Testdata/registration.json";

export class CheckoutAction {
    readonly checkoutPage_instance: CheckoutPage;

    constructor(page: Page) {
        this.checkoutPage_instance = new CheckoutPage(page);
    }

    async navigateToCart(): Promise<void> {
        await this.checkoutPage_instance.page.goto(
            `${registrationData.baseUrl}${this.checkoutPage_instance.cartUrl}`
        );
    }

    async acceptTermsOfService(): Promise<void> {
        await this.checkoutPage_instance.termsCheckbox.check();
        await expect(this.checkoutPage_instance.termsCheckbox).toBeChecked();
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutPage_instance.checkoutButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async selectNewBillingAddress(): Promise<void> {
        const dropdown = this.checkoutPage_instance.billingAddressDropdown;
        const countryDropdown = this.checkoutPage_instance.countryDropdown;

        const dropdownVisible = await dropdown.isVisible().catch(() => false);

        if (dropdownVisible) {
        await dropdown.selectOption({ label: "New Address" });
        await countryDropdown.waitFor({ state: "visible", timeout: 10000 });
    }

}

async fillBillingDetails(data: typeof registrationData.checkout): Promise<void> {
    await this.checkoutPage_instance.countryDropdown.waitFor({
        state: "visible",
        timeout: 10000,
    });
    await this.checkoutPage_instance.countryDropdown.selectOption({ label: data.country });

    await this.checkoutPage_instance.page.waitForTimeout(1500);

    await this.checkoutPage_instance.cityInput.fill(data.city);
    await this.checkoutPage_instance.addressInput.fill(data.address);
    await this.checkoutPage_instance.zipInput.fill(data.zip);
    await this.checkoutPage_instance.phoneInput.fill(data.phone);
}

 async clickBillingContinue(): Promise<void> {
    const continueButton = this.checkoutPage_instance.billingContinueButton;

    await expect(continueButton).toBeEnabled({ timeout: 10000 });
    await continueButton.click();
    await this.checkoutPage_instance.page.waitForLoadState("load");
}

    async clickShippingAddressContinue(): Promise<void> {
        await this.checkoutPage_instance.shippingAddressContinueButton.waitFor({
            state: "visible",
            timeout: 10000,
        });
        await this.checkoutPage_instance.shippingAddressContinueButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async selectShippingMethod(): Promise<void> {
        await this.checkoutPage_instance.shippingMethodGround.waitFor({
            state: "visible",
            timeout: 10000,
        });
        await this.checkoutPage_instance.shippingMethodGround.check();
    }

    async clickShippingContinue(): Promise<void> {
        await this.checkoutPage_instance.shippingContinueButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async selectPaymentMethod(): Promise<void> {
        await this.checkoutPage_instance.paymentMethodCheckMoney.check();
    }

    async clickPaymentContinue(): Promise<void> {
        await this.checkoutPage_instance.paymentContinueButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async clickPaymentInfoContinue(): Promise<void> {
        await this.checkoutPage_instance.paymentInfoContinueButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async clickConfirmOrder(): Promise<void> {
        await this.checkoutPage_instance.confirmOrderButton.click();
        await this.checkoutPage_instance.page.waitForLoadState("load");
    }

    async verifyOrderConfirmation(): Promise<void> {
        await expect(this.checkoutPage_instance.orderConfirmationMessage).toBeVisible({ timeout: 15000 });
        await expect(this.checkoutPage_instance.orderConfirmationMessage).toContainText(
            "Your order has been successfully processed!"
        );
    }
}