import { Page, Locator } from "@playwright/test";

export class ViewCartPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly cartItems: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly orderTotal: Locator;
    readonly cartUrl: string = "/cart";

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator("//ul[contains(@class,'top-links')]//a[@class='ico-cart']");
        this.cartItems = page.locator("//tr[contains(@class,'cart-item-row')]");
        this.productName = page.locator("//td[@class='product']//a");
        this.productPrice = page.locator("//td[@class='unit-price nobr']//span[@class='product-unit-price']");
        this.orderTotal = page.locator("//td[@class='subtotal nobr end']//span[@class='product-subtotal']");
    }
}