import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly booksCategory: Locator;
    readonly firstProduct: Locator;
    readonly addToCartButton: Locator;
    readonly successNotification: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.booksCategory = page.locator("//div[@class='block block-category-navigation']//a[normalize-space()='Books']");
        this.firstProduct = page.locator("//h2[contains(@class,'product-title')]//a[@href='/computing-and-internet'][normalize-space()='Computing and Internet']");
        this.addToCartButton = page.locator("//input[@id='add-to-cart-button-13']");
        this.successNotification = page.locator("//p[@class='content']");
        this.cartCount = page.locator("span.cart-qty");
    }
}