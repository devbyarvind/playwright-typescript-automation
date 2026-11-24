import { Page, expect } from "@playwright/test";
import { CartPage } from "../Page/cart-page";

export class CartAction {
    readonly cartPage_instance: CartPage;

    constructor(page: Page) {
        this.cartPage_instance = new CartPage(page);
    }

    async clickBooksCategory(): Promise<void> {
        await this.cartPage_instance.booksCategory.click();
    }

    async clickFirstProduct(): Promise<void> {
        await this.cartPage_instance.firstProduct.click();
    }

    async clickAddToCart(): Promise<void> {
        await Promise.all([this.cartPage_instance.page.waitForResponse(
                response =>
                    response.url().includes("/addproducttocart") &&
                    response.status() === 200
            ),
            this.cartPage_instance.addToCartButton.click(),
        ]);
    }

    async verifySuccessNotification(): Promise<void> {
        await expect(this.cartPage_instance.successNotification).toBeVisible({ timeout: 10000 });
        await expect(this.cartPage_instance.successNotification).toContainText(
            "The product has been added to your"
        );
    }

    async verifyCartCountUpdated(): Promise<void> {
        await expect(this.cartPage_instance.cartCount).not.toHaveText("(0)", { timeout: 10000 });
        const countText = await this.cartPage_instance.cartCount.textContent();
        const count = parseInt(countText?.replace(/\D/g, "") || "0");
        expect(count).toBeGreaterThan(0);
    }
}