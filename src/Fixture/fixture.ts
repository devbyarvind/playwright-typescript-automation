import { test as base } from "@playwright/test";
import { UserRegistrationAction } from "../Action/registration-Action";
import { LoginAction } from "../Action/login-Action";
import { SearchAction } from "../Action/search-Action";
import { CartAction } from "../Action/cart-Action";
import { ViewCartAction } from "../Action/view-cart-Action";
import { RemoveCartAction } from "../Action/remove-cart-Action";
import { UpdateCartAction } from "../Action/update-cart-Action";
import { BrowseCategoriesAction } from "../Action/browse-categories-Action";
import { WishlistAction } from "../Action/wishlist-Action";
import { CouponAction } from "../Action/coupon-Action";
import { SortingAction } from "../Action/sorting-Action";
import { NewsletterAction } from "../Action/newsletter-Action";
import { CompareAction } from "../Action/compare-Action";
import { CheckoutAction } from "../Action/checkout-Action";
import registration from "../Testdata/registration.json";

type AppActions = {
    registration: UserRegistrationAction;
    login: LoginAction;
    search: SearchAction;
    cart: CartAction;
    viewCart: ViewCartAction;
    removeCart: RemoveCartAction;
    updateCart: UpdateCartAction;
    browseCategories: BrowseCategoriesAction;
    wishlist: WishlistAction;
    coupon: CouponAction;
    sorting: SortingAction;
    newsletter: NewsletterAction;
    compare: CompareAction;
    checkout: CheckoutAction;


};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({

    gotoBaseUrl: [
        async ({ page }, use) => {
            await page.goto(registration.baseUrl);
            await use();
        },
        { auto: true },
    ],

    appActions: async ({ page }, use) => {
        await use({
            registration: new UserRegistrationAction(page),
            login: new LoginAction(page),
            search: new SearchAction(page),
            cart: new CartAction(page),
            viewCart: new ViewCartAction(page),
            removeCart: new RemoveCartAction(page),
            updateCart: new UpdateCartAction(page),
            browseCategories: new BrowseCategoriesAction(page),
            wishlist: new WishlistAction(page),
            coupon: new CouponAction(page),
            sorting: new SortingAction(page),
            newsletter: new NewsletterAction(page),
            compare: new CompareAction(page),
            checkout: new CheckoutAction(page),
            

        });
    },

});

export { expect } from "@playwright/test";