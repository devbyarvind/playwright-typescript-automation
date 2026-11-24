import { Page, Locator } from "@playwright/test";

export class SearchPage {
    readonly page: Page;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly productList: Locator;
    readonly productTitles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.locator("//input[@id='small-searchterms']");
        this.searchButton = page.locator("//input[@class='button-1 search-box-button']");
        this.searchInput = page.locator("//input[@id='Q']");
        this.productList = page.locator("//div[@class='product-item']");
        this.productTitles = page.locator("//h2[@class='product-title']");
    }
}