import { Page, Locator } from "@playwright/test";

export class SortingPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly sortDropdown: Locator;
    readonly productTitles: Locator;
    readonly booksUrl: string = "/books";

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator("h1:has-text('Books')");
        this.sortDropdown = page.locator("#products-orderby");
        this.productTitles = page.locator(".product-title a");
    }
}