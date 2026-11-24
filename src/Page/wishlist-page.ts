import { Page, Locator } from "@playwright/test";

export class WishlistPage {
    readonly page: Page;
    readonly targetProduct: Locator;
    readonly addToWishlistButton: Locator;
    readonly successNotification: Locator;
    readonly wishlistItems: Locator;
    readonly wishlistUrl: string = "/wishlist";

    constructor(page: Page) {
        this.page = page;
        this.targetProduct = page.locator("//h2[@class='product-title']//a[@href='/fiction-ex']");
        this.addToWishlistButton = page.locator("//input[@id='add-to-wishlist-button-78']");
        this.successNotification = page.locator("//p[@class='content']");
        this.wishlistItems = page.locator("//tr[contains(@class,'cart-item-row')]");
    }
}