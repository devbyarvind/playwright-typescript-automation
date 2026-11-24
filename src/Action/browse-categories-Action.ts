import { Page } from "@playwright/test";
import { BrowseCategoriesPage } from "../Page/browse-categories-page";

export class BrowseCategoriesAction {
    readonly browseCategoriesPage_instance: BrowseCategoriesPage;

    constructor(page: Page) {
        this.browseCategoriesPage_instance = new BrowseCategoriesPage(page);
    }

    async verifyNavMenuVisible(): Promise<void> {
        await this.browseCategoriesPage_instance.topMenu.waitFor({ state: "visible" });
    }

    async clickBooks(): Promise<void> {
        await this.browseCategoriesPage_instance.booksLink.click();
    }

    async clickComputers(): Promise<void> {
        await this.browseCategoriesPage_instance.computersLink.click();
    }

    async clickElectronics(): Promise<void> {
        await this.browseCategoriesPage_instance.electronicsLink.click();
    }

    async clickApparel(): Promise<void> {
        await this.browseCategoriesPage_instance.apparelLink.click();
    }

    async getProductCount(): Promise<number> {
        return await this.browseCategoriesPage_instance.productItems.count();
    }

    async getSubCategoryCount(): Promise<number> {
        return await this.browseCategoriesPage_instance.subCategoryItems.count();
    }
}