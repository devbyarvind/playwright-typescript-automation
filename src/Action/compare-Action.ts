import { Page, expect } from "@playwright/test";
import { ComparePage } from "../Page/compare-page";
import registrationData from "../Testdata/registration.json";

export class CompareAction {
    readonly comparePage_instance: ComparePage;

    constructor(page: Page) {
        this.comparePage_instance = new ComparePage(page);
    }

    async navigateToBooks(): Promise<void> {
        await this.comparePage_instance.page.goto(
            `${registrationData.baseUrl}${this.comparePage_instance.booksUrl}`
        );
    }

    async verifyProductsListed(): Promise<void> {
        await expect(this.comparePage_instance.productItems.first()).toBeVisible();
    }

    async clickFirstProduct(): Promise<void> {
        await this.comparePage_instance.firstProductLink.click();
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async addFirstProductToCompare(): Promise<void> {
        await this.comparePage_instance.firstProductCompareButton.click();
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async goBackToBooks(): Promise<void> {
        await this.comparePage_instance.page.goto(
            `${registrationData.baseUrl}${this.comparePage_instance.booksUrl}`
        );
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async clickSecondProduct(): Promise<void> {
        await this.comparePage_instance.secondProductLink.click();
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async addSecondProductToCompare(): Promise<void> {
        await this.comparePage_instance.secondProductCompareButton.click();
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async navigateToComparePage(): Promise<void> {
        await this.comparePage_instance.page.goto(
            `${registrationData.baseUrl}${this.comparePage_instance.compareUrl}`
        );
        await this.comparePage_instance.page.waitForLoadState("load");
    }

    async verifyProductsInComparison(): Promise<void> {
        await expect(this.comparePage_instance.comparePageTitle).toBeVisible();
        await expect(this.comparePage_instance.comparePageTitle).toHaveText("Compare products");
    }
} 