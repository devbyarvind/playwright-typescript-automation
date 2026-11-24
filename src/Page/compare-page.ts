import { Page, Locator } from "@playwright/test";

export class ComparePage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly comparePageTitle: Locator;
    readonly compareTableProducts: Locator;
    readonly firstProductLink: Locator;
    readonly firstProductCompareButton: Locator;
    readonly secondProductLink: Locator;
    readonly secondProductCompareButton: Locator;
    readonly booksUrl: string = "/books";
    readonly compareUrl: string = "/compareproducts";

    constructor(page: Page) {
        this.page = page;
        this.productItems = page.locator("//div[contains(@class,'product-item')]");
        this.comparePageTitle = page.locator("//div[@class='page-title']//h1");
        this.compareTableProducts = page.locator(
            "//table[contains(@class,'compare-products-table')]//td[@class='product-name']"
        );

        this.firstProductLink = page.locator(
            "//h2[contains(@class,'product-title')]//a[@href='/computing-and-internet']"
        );
        this.firstProductCompareButton = page.getByRole("button", { name: "Add to compare list" });

        this.secondProductLink = page.locator(
            "//h2[contains(@class,'product-title')]//a[@href='/fiction']"
        );
        this.secondProductCompareButton = page.getByRole("button", { name: "Add to compare list" });
    }
}