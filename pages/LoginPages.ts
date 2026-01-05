import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";
import { Config } from "../utils/environment";

export class LoginPages extends BasePage{
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    constructor(page:Page){
        super(page);
        this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.alert-error');
    this.successMessage = page.locator('#flash');
    }
    async navigateToLogin() {
        await this.goto(Config.baseUrl);
      }
    
      async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        await this.waitForSpinFinished();
      }
    
      async loginWithValidCredentials() {
        await this.login(Config.credential.adminUser, Config.credential.adminPass);
        
      }
    
      async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessage);
      }
    
      async getSuccessMessage(): Promise<string> {
        return await this.getText(this.successMessage);
      }
    
      async isSuccessMessageVisible(): Promise<boolean> {
        return await this.successMessage.isVisible();
      }
}