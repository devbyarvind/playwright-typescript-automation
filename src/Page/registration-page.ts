import{Page,Locator} from "@playwright/test"

export class UserRegistrationPage{
    readonly page:Page;
    readonly verifyDashTitle:Locator;
    readonly clickRegisterLink: Locator;          
    readonly verifyFormTitle:Locator;        
    readonly verifyGender:Locator;           
    readonly FirstName:Locator;
    readonly LastName:Locator;             
    readonly Email:Locator;            
    readonly Password:Locator;         
    readonly ConfirmPassword:Locator;  
    readonly RegisterButton:Locator;     
    readonly SuccessMessage:Locator;   

    constructor(page:Page){
        this.page=page;
        this.verifyDashTitle=page.locator("//img[@alt='Tricentis Demo Web Shop']");
        this.clickRegisterLink=page.locator("//a[@href='/register']");
        this.verifyFormTitle=page.getByRole("heading", { name: "Register" });
        this.verifyGender=page.locator("//input[@id='gender-male']");
        this.FirstName=page.locator("//input[@id='FirstName']");
        this.LastName=page.locator("//input[@id='LastName']");
        this.Email=page.locator("//input[@id='Email']");
        this.Password=page.locator("//input[@id='Password']");
        this.ConfirmPassword=page.locator("//input[@id='ConfirmPassword']");
        this.RegisterButton=page.locator("//input[@id='register-button']");
        this.SuccessMessage=page.locator("//div[@class='result']");


    }
}