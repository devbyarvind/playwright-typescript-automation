import { Page, Locator } from "@playwright/test";

export class UpdateCartPage {
    readonly page: Page;
    readonly quantityInput: Locator;
    readonly updateCartButton: Locator;
    readonly orderTotal: Locator;
    readonly cartUrl: string = "/cart";

    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator("//input[contains(@class,'qty-input')]");
        this.updateCartButton = page.locator("//input[@name='updatecart']");
        this.orderTotal = page.locator("//span[@class='product-price order-total']");
    }
}