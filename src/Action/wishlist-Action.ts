import { Page, expect } from "@playwright/test";
import { WishlistPage } from "../Page/wishlist-page";
import registrationData from "../Testdata/registration.json";

export class WishlistAction {
    readonly wishlistPage_instance: WishlistPage;

    constructor(page: Page) {
        this.wishlistPage_instance = new WishlistPage(page);
    }

    async clickTargetProduct(): Promise<void> {
        await this.wishlistPage_instance.targetProduct.click();
    }

    async clickAddToWishlist(): Promise<void> {
        await this.wishlistPage_instance.addToWishlistButton.click();
        await this.wishlistPage_instance.successNotification.waitFor({
            state: "visible",
            timeout: 10000,
        });
    }

    async verifySuccessNotification(): Promise<void> {
        await expect(this.wishlistPage_instance.successNotification).toBeVisible({ timeout: 10000 });
        await expect(this.wishlistPage_instance.successNotification).toContainText(
            "Your quantity exceeds stock on hand. The maximum quantity that can be added is 1."
        );
    }

    async navigateToWishlist(): Promise<void> {
        await this.wishlistPage_instance.page.goto(
            `${registrationData.baseUrl}${this.wishlistPage_instance.wishlistUrl}`
        );
    }

    async verifyProductInWishlist(): Promise<void> {
        await expect(this.wishlistPage_instance.wishlistItems.first()).toBeVisible();
        const count = await this.wishlistPage_instance.wishlistItems.count();
        expect(count).toBeGreaterThan(0);
    }
}