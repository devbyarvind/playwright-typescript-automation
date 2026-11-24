import { test, expect } from "../src/Fixture/fixture";
import registrationData from "../src/Testdata/registration.json";

test("TC01-User Registration", async ({appActions,}) => {
    const reg = appActions.registration.registrationpage_instance;

    // Here i have verified the homepage
    await expect(reg.verifyDashTitle).toBeVisible();

    // clicked on the register  
    await expect(reg.clickRegisterLink).toBeVisible();
    await reg.clickRegisterLink.click();

    // Verify Register page is displayed
    await expect(reg.verifyFormTitle).toBeVisible();

    // Entered all the valid details
    await appActions.registration.selectGenderMale();
    await expect(reg.verifyGender).toBeChecked(); 
    await reg.FirstName.fill(registrationData.registration.firstName);
    await reg.LastName.fill(registrationData.registration.lastName);
    await reg.Email.fill(registrationData.registration.email);
    await reg.Password.fill(registrationData.registration.password);
    await reg.ConfirmPassword.fill(registrationData.registration.confirmPassword);
    await reg.RegisterButton.click();

    // Here I have Verified Success message
    await expect(reg.SuccessMessage).toBeVisible();
    await expect(reg.SuccessMessage).toContainText("Your registration completed");
});

test("TC02-Valid User Login", async ({ appActions }) => {

    // Created the variable and stored app and login properties

    const log = appActions.login.loginPage_instance;
    
    // Filled data and verified 
    await log.page.goto(registrationData.baseUrl);
    await expect(log.clickLoginLink).toBeVisible();
    await log.clickLoginLink.click();
    await log.emailInput.fill(registrationData.registration.email);
    await log.passwordInput.fill(registrationData.registration.password);
    await log.loginButton.click();
    await expect(log.accountEmail).toBeVisible();
    await expect(log.logoutLink).toBeVisible();
});

test("TC03-Invalid User Login", async ({ appActions }) => {

    const log = appActions.login.loginPage_instance;
    // Filled the Data and Verified the login invalid 
    await log.page.goto(registrationData.baseUrl);
    await expect(log.clickLoginLink).toBeVisible();
    await log.clickLoginLink.click();
    await log.emailInput.fill(registrationData.login.invalid.email);
    await log.passwordInput.fill(registrationData.login.invalid.password);
    await log.loginButton.click();
    await appActions.login.verifyErrorMessage();
    await appActions.login.verifyStaysOnLoginPage();
});

test("TC04-Search for Product", async ({ appActions }) => {

    const search = appActions.search.searchPage_instance;

    // Verified all the step as per the tescase
    await search.page.goto(registrationData.baseUrl);
    await appActions.search.verifySearchBoxVisible();
    await appActions.search.searchProduct("book");
    await appActions.search.verifySearchResultsPage();
    await appActions.search.verifyResultsNotEmpty();
    await appActions.search.verifyProductTitlesVisible();
});

test("TC05-Add Product to Cart", async ({ appActions }) => {

    const cart = appActions.cart.cartPage_instance;

    // Verified all the steps
    await cart.page.goto(registrationData.baseUrl);
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();
    await appActions.cart.verifySuccessNotification();
    await appActions.cart.verifyCartCountUpdated();
});

test("TC06-View Shopping Cart", async ({ appActions }) => {
    const cart = appActions.cart.cartPage_instance;

    await cart.page.goto(registrationData.baseUrl);
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();
    await appActions.viewCart.clickShoppingCartLink();
    await appActions.viewCart.verifyCartNotEmpty();
    await appActions.viewCart.verifyProductNameVisible();
    await appActions.viewCart.verifyPriceVisible();
    await appActions.viewCart.verifyOrderTotalVisible();
});

test("TC07-Remove Item from Cart", async ({ appActions }) => {
    const cart = appActions.cart.cartPage_instance;

    await cart.page.goto(registrationData.baseUrl);
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();
    await appActions.removeCart.clickShoppingCartLink();
    await appActions.removeCart.verifyCartNotEmpty();
    await appActions.removeCart.checkRemoveCheckbox();
    await appActions.removeCart.clickUpdateCart();
    await appActions.removeCart.verifyCartEmpty();
});

test("TC08-Update Cart Quantity", async ({ appActions }) => {
    const cart = appActions.cart.cartPage_instance;

    await cart.page.goto(registrationData.baseUrl);

    // Added product cart and used category 
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();

    await appActions.updateCart.navigateToCart();
    await appActions.updateCart.verifyQuantityInputVisible();
    await appActions.updateCart.updateQuantity(registrationData.cart.updatedQty);
    await appActions.updateCart.clickUpdateCart();
    await appActions.updateCart.verifyQuantityUpdated(registrationData.cart.updatedQty);
    await appActions.updateCart.verifyOrderTotalVisible();
});

test("TC09-Browse Categories", async ({ appActions }) => {
    const browse = appActions.browseCategories.browseCategoriesPage_instance;

    // 

    await browse.page.goto(registrationData.baseUrl);

    await appActions.browseCategories.verifyNavMenuVisible();
    await appActions.browseCategories.clickBooks();
    await expect(browse.page).toHaveURL(/\/books/);
    await appActions.browseCategories.clickComputers();
    await expect(browse.page).toHaveURL(/\/computers/);
    await appActions.browseCategories.clickElectronics();
    await expect(browse.page).toHaveURL(/\/electronics/);
    await appActions.browseCategories.clickApparel();
    await expect(browse.page).toHaveURL(/\/apparel-shoes/);
    
    // Here i have verified the product 
    const productCount = await appActions.browseCategories.getProductCount();
    const subCategoryCount = await appActions.browseCategories.getSubCategoryCount();
    expect(productCount + subCategoryCount).toBeGreaterThan(0);
});

test("TC10-Add to Wishlist", async ({ appActions }) => {
    const login = appActions.login.loginPage_instance;

    // Navigate to website
    await login.page.goto(registrationData.baseUrl);

    // Login to account
    await appActions.login.clickLoginLink();
    await appActions.login.login(registrationData.login.valid);
    await appActions.login.verifyUserLoggedIn(registrationData.login.valid.email);

    // Navigate to Books and added to wishlist
    await appActions.cart.clickBooksCategory();
    await appActions.wishlist.clickTargetProduct();
    await appActions.wishlist.clickAddToWishlist();
    await appActions.wishlist.verifySuccessNotification();
    await appActions.wishlist.navigateToWishlist();
    await appActions.wishlist.verifyProductInWishlist();
});

test("TC11-Apply Coupon Code", async ({ appActions }) => {
    const cart = appActions.cart.cartPage_instance;

    await cart.page.goto(registrationData.baseUrl);
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();
    await appActions.coupon.navigateToCart();
    await appActions.coupon.verifyCouponInputVisible();
    await appActions.coupon.enterCouponCode(registrationData.coupon.invalidCode);
    
    const totalBefore = await appActions.coupon.getOrderTotal();
    await appActions.coupon.clickApplyCoupon();
    await appActions.coupon.verifyCouponErrorMessage();
    await appActions.coupon.verifyOrderTotalUnchanged(totalBefore);
});

test("TC12-Product Sorting", async ({ appActions }) => {

    await appActions.sorting.navigateToBooks();
    await appActions.sorting.verifyPageLoaded();
    await appActions.sorting.verifySortDropdownVisible();
    await appActions.sorting.selectSortOption("Name: A to Z");
    const names = await appActions.sorting.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);
    await appActions.sorting.selectSortOption("Price: Low to High");
    await expect(appActions.sorting.sortingPage_instance.page).toHaveURL(/orderby=/);
});

test("TC13-Newsletter Subscription", async ({ appActions }) => {
    const newsletter = appActions.newsletter.newsletterPage_instance;
    await newsletter.page.goto(registrationData.baseUrl);
    await appActions.newsletter.scrollToFooter();
    await appActions.newsletter.verifyNewsletterInputVisible();
    await appActions.newsletter.enterEmail(registrationData.newsletter.email);
    await appActions.newsletter.clickSubscribe();
    await appActions.newsletter.verifySuccessMessage();
});

test("TC14-Product Comparison", async ({ appActions }) => {
    const compare = appActions.compare.comparePage_instance;

    await appActions.compare.navigateToBooks();
    await appActions.compare.verifyProductsListed();
    await appActions.compare.clickFirstProduct();
    await appActions.compare.addFirstProductToCompare();
    await appActions.compare.goBackToBooks();
    await appActions.compare.clickSecondProduct();
    await appActions.compare.addSecondProductToCompare();
    await appActions.compare.navigateToComparePage();
    await appActions.compare.verifyProductsInComparison();
});

test("TC015 | Complete Checkout", async ({ appActions }) => {
    const login = appActions.login.loginPage_instance;

    await login.page.goto(registrationData.baseUrl);

    // used the login method here varified all the test cases
    await appActions.login.clickLoginLink();
    await appActions.login.login(registrationData.login.valid);
    await appActions.login.verifyUserLoggedIn(registrationData.login.valid.email);
    await appActions.cart.clickBooksCategory();
    await appActions.cart.clickFirstProduct();
    await appActions.cart.clickAddToCart();

    await appActions.checkout.navigateToCart();
    await appActions.checkout.acceptTermsOfService();
    await appActions.checkout.clickCheckout();
    await appActions.checkout.selectNewBillingAddress();
    await appActions.checkout.fillBillingDetails(registrationData.checkout);
    await appActions.checkout.clickBillingContinue();
    await appActions.checkout.clickShippingAddressContinue();
    await appActions.checkout.selectShippingMethod();
    await appActions.checkout.clickShippingContinue();
    await appActions.checkout.selectPaymentMethod();
    await appActions.checkout.clickPaymentContinue();
    await appActions.checkout.clickPaymentInfoContinue();
    await appActions.checkout.clickConfirmOrder();
    await appActions.checkout.verifyOrderConfirmation();
});