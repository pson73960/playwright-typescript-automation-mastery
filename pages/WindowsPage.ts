import { Page, Locator } from "@playwright/test";
import {BasePage} from "./BasePage";
export class WindowsPage extends BasePage {
    readonly clickHereButton: Locator;
    readonly headerText:Locator;
    constructor(page: Page) {
      super(page);
      this.clickHereButton = page.getByText('Click Here');
      this.headerText = page.locator('h3');
    }
      async openNewWindow() {
        // Chúng ta dùng context của page hiện tại để lắng nghe sự kiện 'page' (tab mới)
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          this.clickHereButton.click(),
        ]);
        
        // Đợi tab mới load xong hoàn toàn (Lead tip)
        await newPage.waitForLoadState();
        
        return newPage; 
      }

}