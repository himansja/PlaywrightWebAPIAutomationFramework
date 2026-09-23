import type { Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class LoginPage extends BasePage {
    // 1. Private Locators
    private readonly emailId : Locator;
    private readonly password : Locator;
    private readonly loginBtn : Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly loginErrorMsg : Locator


    // 2. Constructor of teh page class init the locators:
    constructor(page: Page){
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' }); // When test file called this class, page object is pass to BasePage Class 
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginErrorMsg = page.locator('.alert.alert-danger.alert-dismissible');
    }

    // 3. public page actions (methods) / behavior Encapsulation
    public async goToLoginPage() : Promise<void>{
        await this.page.goto('/opencart/index.php?route=account/login')
    }

    public async getLoginPageTitle(): Promise<string>{
        return await this.page.title();
    }

    public async isForgottenPasswordLinkVisible() : Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }

    public async doLogin(username: string, password: string): Promise<void>{
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    public async isInvalidLoginErrorDisplayed(): Promise<Boolean> {
        return await this.loginErrorMsg.isVisible();
    }

}