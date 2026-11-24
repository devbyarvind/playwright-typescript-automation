import { Page, Locator } from "@playwright/test";

export class NewsletterPage {
    readonly page: Page;
    readonly newsletterInput: Locator;
    readonly subscribeButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newsletterInput = page.locator("//input[@id='newsletter-email']");
        this.subscribeButton = page.locator("//input[@id='newsletter-subscribe-button']");
        this.successMessage = page.locator("//div[@id='newsletter-result-block']");
    }
}