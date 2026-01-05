import { Page, Locator } from "@playwright/test";
import { BasePage} from "./BasePage";

export class LoginPage extends BasePage{
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginButton: Locator;
    constructor (page:Page){
        super(page);
        this.userName = page.locator('#username');
        this.passWord = page.locator('#password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
    };
async login(user: string, pass: string){
    await this.userName.fill(user);
    await this.passWord.fill(pass);
    await this.loginButton.click();
    await this.waitForLoading();
};
async openPage(){
    await this.Navigate('/login');
}
}