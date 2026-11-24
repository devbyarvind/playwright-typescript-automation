import { Page, expect } from "@playwright/test";
import { SortingPage } from "../Page/sorting-page";
import registrationData from "../Testdata/registration.json";

export class SortingAction {
    readonly sortingPage_instance: SortingPage;

    constructor(page: Page) {
        this.sortingPage_instance = new SortingPage(page);
    }

    async navigateToBooks(): Promise<void> {
        await this.sortingPage_instance.page.goto(
            `${registrationData.baseUrl}${this.sortingPage_instance.booksUrl}`
        );
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.sortingPage_instance.pageTitle).toBeVisible();
    }

    async verifySortDropdownVisible(): Promise<void> {
        await expect(this.sortingPage_instance.sortDropdown).toBeVisible();
    }

    async selectSortOption(label: string): Promise<void> {
        await Promise.all([
            this.sortingPage_instance.page.waitForNavigation(),
            this.sortingPage_instance.sortDropdown.selectOption({ label }),
        ]);
    }

    async getProductNames(): Promise<string[]> {
        return await this.sortingPage_instance.productTitles.allTextContents();
}
}