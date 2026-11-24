import { Page, expect } from "@playwright/test";
import { CouponPage } from "../Page/coupon-page";
import registrationData from "../Testdata/registration.json";

export class CouponAction {
    readonly couponPage_instance: CouponPage;

    constructor(page: Page) {
        this.couponPage_instance = new CouponPage(page);
    }

    async navigateToCart(): Promise<void> {
        await this.couponPage_instance.page.goto(
            `${registrationData.baseUrl}${this.couponPage_instance.cartUrl}`
        );
    }

    async verifyCouponInputVisible(): Promise<void> {
        await expect(this.couponPage_instance.couponInput).toBeVisible();
    }

    async enterCouponCode(code: string): Promise<void> {
        await this.couponPage_instance.couponInput.fill(code);
    }

    async clickApplyCoupon(): Promise<void> {
        await this.couponPage_instance.applyCouponButton.click();
        await this.couponPage_instance.couponErrorMessage.waitFor({
            state: "visible",
            timeout: 10000,
        });
    }

    async getOrderTotal(): Promise<string> {
        return (await this.couponPage_instance.orderTotal.textContent()) ?? "";
    }

    async verifyCouponErrorMessage(): Promise<void> {
        await expect(this.couponPage_instance.couponErrorMessage).toBeVisible({ timeout: 10000 });
        await expect(this.couponPage_instance.couponErrorMessage).toContainText(
            "The coupon code you entered couldn't be applied"
        );
    }

    async verifyOrderTotalUnchanged(totalBefore: string): Promise<void> {
        const totalAfter = await this.getOrderTotal();
        expect(totalAfter).toBe(totalBefore);
    }
}