import { Page, expect } from "@playwright/test";
import { UpdateCartPage } from "../Page/update-cart-page";
import registrationData from "../Testdata/registration.json";

export class UpdateCartAction {
    readonly updateCartPage_instance: UpdateCartPage;

    constructor(page: Page) {
        this.updateCartPage_instance = new UpdateCartPage(page);
    }

    async navigateToCart(): Promise<void> {
        await this.updateCartPage_instance.page.goto(
            `${registrationData.baseUrl}${this.updateCartPage_instance.cartUrl}`
        );
    }

    async verifyQuantityInputVisible(): Promise<void> {
        await expect(this.updateCartPage_instance.quantityInput.first()).toBeVisible();
    }

    async updateQuantity(qty: number): Promise<void> {
        await this.updateCartPage_instance.quantityInput.first().clear();
        await this.updateCartPage_instance.quantityInput.first().fill(qty.toString());
    }

    async clickUpdateCart(): Promise<void> {
        await Promise.all([
            this.updateCartPage_instance.page.waitForResponse(
                response =>
                    response.url().includes("/cart") &&
                    response.status() === 200
            ),
            this.updateCartPage_instance.updateCartButton.click(),
        ]);
    }

    async verifyQuantityUpdated(expectedQty: number): Promise<void> {
        await expect(this.updateCartPage_instance.quantityInput.first()).toHaveValue(
            expectedQty.toString()
        );
    }

    async verifyOrderTotalVisible(): Promise<void> {
        await expect(this.updateCartPage_instance.orderTotal).toBeVisible();
    }
}