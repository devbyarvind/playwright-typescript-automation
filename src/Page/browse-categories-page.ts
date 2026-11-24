import { Page, Locator } from "@playwright/test";

export class BrowseCategoriesPage {
    readonly page: Page;
    readonly topMenu: Locator;

    readonly booksLink: Locator;
    readonly computersLink: Locator;
    readonly electronicsLink: Locator;
    readonly apparelLink: Locator;

    readonly productItems: Locator;
    readonly subCategoryItems: Locator;

    constructor(page: Page) {
        this.page = page;

        this.topMenu = page.locator('.header-menu .top-menu');

        this.booksLink = this.topMenu.getByRole('link', { name: 'Books' });
        this.computersLink = this.topMenu.getByRole('link', { name: 'Computers' });
        this.electronicsLink = this.topMenu.getByRole('link', { name: 'Electronics' });
        this.apparelLink = this.topMenu.getByRole('link', { name: 'Apparel & Shoes' });

        this.productItems = page.locator('.product-item');
        this.subCategoryItems = page.locator('.sub-category-item');
    }
}