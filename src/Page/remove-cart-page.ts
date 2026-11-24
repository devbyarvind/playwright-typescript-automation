import { Page, Locator } from "@playwright/test";

export class RemoveCartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly removeCheckbox: Locator;
    readonly updateCartButton: Locator;
    readonly emptyCartMessage: Locator;
    readonly cartUrl: string = "/cart";

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator("//tr[contains(@class,'cart-item-row')]");
        this.removeCheckbox = page.locator("//input[@name='removefromcart']").first();
        this.updateCartButton = page.locator("//input[@name='updatecart']");
        this.emptyCartMessage = page.locator("//div[@class='order-summary-content']");
    }
}