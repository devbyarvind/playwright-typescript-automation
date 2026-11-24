import { Page, Locator } from "@playwright/test";

export class CouponPage {
    readonly page: Page;
    readonly couponInput: Locator;
    readonly applyCouponButton: Locator;
    readonly couponErrorMessage: Locator;
    readonly orderTotal: Locator;
    readonly cartUrl: string = "/cart";

    constructor(page: Page) {
        this.page = page;
        this.couponInput = page.locator("//input[@class='discount-coupon-code']");
        this.applyCouponButton = page.locator("//input[@class='button-2 apply-discount-coupon-code-button']");
        this.couponErrorMessage = page.locator("//div[@class='message']");
        this.orderTotal = page.locator("//span[@class='product-price order-total']");
    }
}