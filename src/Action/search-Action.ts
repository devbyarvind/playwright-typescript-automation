import { Page, expect } from "@playwright/test";
import { SearchPage } from "../Page/search-page";

export class SearchAction {
    readonly searchPage_instance: SearchPage;

    constructor(page: Page) {
        this.searchPage_instance = new SearchPage(page);
    }

    async verifySearchBoxVisible(): Promise<void> {
        await expect(this.searchPage_instance.searchBox).toBeVisible();
    }

    async searchProduct(keyword: string): Promise<void> {
        await this.searchPage_instance.searchBox.fill(keyword);
        await this.searchPage_instance.searchButton.click();
    }

    async verifySearchResultsPage(): Promise<void> {
        await expect(this.searchPage_instance.page).toHaveURL(/.*\/search/);
    }

    async verifyResultsNotEmpty(): Promise<void> {
        await expect(this.searchPage_instance.productList.first()).toBeVisible();
        const count = await this.searchPage_instance.productList.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyProductTitlesVisible(): Promise<void> {
        await expect(this.searchPage_instance.productTitles.first()).toBeVisible();
        const titles = this.searchPage_instance.productTitles;
        const count = await titles.count();
        for (let i = 0; i < count; i++) {
            await expect(titles.nth(i)).toBeVisible();
        }
    }
}