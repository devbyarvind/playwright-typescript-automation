import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly termsCheckbox: Locator;
    readonly checkoutButton: Locator;
    readonly billingAddressDropdown: Locator;
    readonly countryDropdown: Locator;
    readonly cityInput: Locator;
    readonly addressInput: Locator;
    readonly zipInput: Locator;
    readonly phoneInput: Locator;
    readonly billingContinueButton: Locator;
    readonly shippingAddressContinueButton: Locator;
    readonly shippingMethodGround: Locator;
    readonly shippingContinueButton: Locator;
    readonly paymentMethodCheckMoney: Locator;
    readonly paymentContinueButton: Locator;
    readonly paymentInfoContinueButton: Locator;
    readonly confirmOrderButton: Locator;
    readonly orderConfirmationMessage: Locator;
    readonly cartUrl: string = "/cart";

    constructor(page: Page) {
        this.page = page;
        this.termsCheckbox = page.locator("//input[@id='termsofservice']");
        this.checkoutButton = page.locator("//button[@id='checkout']");
        this.billingAddressDropdown = page.locator("//select[@id='billing-address-select']");
        this.countryDropdown = page.locator("//select[@id='BillingNewAddress_CountryId']");
        this.cityInput = page.locator("//input[@id='BillingNewAddress_City']");
        this.addressInput = page.locator("//input[@id='BillingNewAddress_Address1']");
        this.zipInput = page.locator("//input[@id='BillingNewAddress_ZipPostalCode']");
        this.phoneInput = page.locator("//input[@id='BillingNewAddress_PhoneNumber']");

        this.billingContinueButton = page.locator(
            "//div[@id='billing-buttons-container']//input[@class='button-1 new-address-next-step-button']"
        );

        this.shippingAddressContinueButton = page.locator(
            "//div[@id='shipping-buttons-container']//input[@class='button-1 new-address-next-step-button']"
        );

        this.shippingMethodGround = page.locator(
            "//input[contains(@id,'shippingoption_')]"
        ).first();

        this.shippingContinueButton = page.locator("//input[@onclick='ShippingMethod.save()']");
        this.paymentMethodCheckMoney = page.locator("//input[@id='paymentmethod_0']");
        this.paymentContinueButton = page.locator("//input[@onclick='PaymentMethod.save()']");
        this.paymentInfoContinueButton = page.locator("//input[@onclick='PaymentInfo.save()']");
        this.confirmOrderButton = page.locator("//input[@onclick='ConfirmOrder.save()']");
        this.orderConfirmationMessage = page.locator("//div[@class='title']//strong");
    }
}