import { Page, expect } from "@playwright/test";
import { NewsletterPage } from "../Page/newsletter-page";

export class NewsletterAction {
    readonly newsletterPage_instance: NewsletterPage;

    constructor(page: Page) {
        this.newsletterPage_instance = new NewsletterPage(page);
    }

    async scrollToFooter(): Promise<void> {
    await this.newsletterPage_instance.newsletterInput.scrollIntoViewIfNeeded();
    }

    async verifyNewsletterInputVisible(): Promise<void> {
    await expect(this.newsletterPage_instance.newsletterInput).toBeVisible();
    }

    async enterEmail(email: string): Promise<void> {
    await this.newsletterPage_instance.newsletterInput.fill(email);
    }

    async clickSubscribe(): Promise<void> {
    await this.newsletterPage_instance.subscribeButton.click();
    await this.newsletterPage_instance.successMessage.waitFor({
        state: "visible",
        timeout: 10000,
    });
    }

    async verifySuccessMessage(): Promise<void> {
    await expect(this.newsletterPage_instance.successMessage).toBeVisible({ timeout: 10000 });
    await expect(this.newsletterPage_instance.successMessage).toContainText(
        "Thank you for signing up"
    );
    }

    
}