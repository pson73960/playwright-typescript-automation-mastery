import { BasePage} from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage{
    readonly logoutButton: Locator;
    // Admin Menu Group
    readonly adminDropdown: Locator;
    readonly fileUploadLink: Locator;
    // Inventory Menu Group
    readonly inventoryDropdown :Locator;
    readonly workBenchLink: Locator;

constructor(page:Page){
super(page);
this.logoutButton = page.locator('#top').getByRole('link', { name: 'Logout' });
this.adminDropdown = page.locator('.nav-has-subnav').filter({ hasText: 'Admin' });
this.fileUploadLink = page.locator('a.nav-filetransferuploadadmin-filetransferupload');
this.inventoryDropdown = page.locator('.nav-has-subnav').filter({hasText: 'Inventory'});
this.workBenchLink = page.locator('.nav-inventory-workbench');
}
async waitForButtonLogout(){
    await this.waitForElement(this.logoutButton);
}
async clickLogout() {
    // Bạn cũng có thể dùng hàm clickElement từ BasePage luôn
    await this.waitForButtonLogout();
    await this.clickElement(this.logoutButton);
}
async goToFileUploadPage() {
    await this.adminDropdown.hover();
    await this.waitForElement(this.fileUploadLink);
    await this.fileUploadLink.click();
    await this.waitForSpinFinished();
    }
async gotoInventoryPage(){
    await this.inventoryDropdown.hover();
    await this.waitForElement(this.workBenchLink);
    await this.workBenchLink.click();
    await this.waitForSpinFinished();
}
}