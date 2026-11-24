import { Page, expect } from "@playwright/test";
import { RemoveCartPage } from "../Page/remove-cart-page";
import registrationData from "../Testdata/registration.json";

export class RemoveCartAction {
    readonly removeCartPage_instance: RemoveCartPage;

    constructor(page: Page) {
        this.removeCartPage_instance = new RemoveCartPage(page);
    }

    async clickShoppingCartLink(): Promise<void> {
        await this.removeCartPage_instance.page.goto(
            `${registrationData.baseUrl}${this.removeCartPage_instance.cartUrl}`
        );
    }

    async verifyCartNotEmpty(): Promise<void> {
        const count = await this.removeCartPage_instance.cartItems.count();
        expect(count).toBeGreaterThan(0);
    }

    async checkRemoveCheckbox(): Promise<void> {
        await this.removeCartPage_instance.removeCheckbox.check();
        await expect(this.removeCartPage_instance.removeCheckbox).toBeChecked();
    }

    async clickUpdateCart(): Promise<void> {
        await Promise.all([
            this.removeCartPage_instance.page.waitForResponse(
                response =>
                    response.url().includes("/cart") &&
                    response.status() === 200
            ),
            this.removeCartPage_instance.updateCartButton.click(),
        ]);
    }

    async verifyCartEmpty(): Promise<void> {
        await expect(this.removeCartPage_instance.emptyCartMessage).toBeVisible({ timeout: 10000 });
        await expect(this.removeCartPage_instance.emptyCartMessage).toContainText(
            "Your Shopping Cart is empty!"
        );
    }
}