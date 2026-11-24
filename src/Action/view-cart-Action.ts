import { Page, expect } from "@playwright/test";
import { ViewCartPage } from "../Page/view-cart-page";
import registrationData from "../Testdata/registration.json";

export class ViewCartAction {
    readonly viewCartPage_instance: ViewCartPage;

    constructor(page: Page) {
        this.viewCartPage_instance = new ViewCartPage(page);
    }

    async clickShoppingCartLink(): Promise<void> {
        await this.viewCartPage_instance.page.goto(
            `${registrationData.baseUrl}${this.viewCartPage_instance.cartUrl}`
        );
    }

    async verifyCartNotEmpty(): Promise<void> {
        const count = await this.viewCartPage_instance.cartItems.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyProductNameVisible(): Promise<void> {
        await expect(this.viewCartPage_instance.productName.first()).toBeVisible();
    }

    async verifyPriceVisible(): Promise<void> {
        await expect(this.viewCartPage_instance.productPrice.first()).toBeVisible();
    }

    async verifyOrderTotalVisible(): Promise<void> {
        await expect(this.viewCartPage_instance.orderTotal).toBeVisible();
    }
}