import { Page, Locator } from "@playwright/test";
import { BasePage } from './BasePage';

export class AlertPage extends BasePage {
    readonly alertButton: Locator;
  readonly resultText: Locator;
  readonly confirmButton:Locator;
  readonly promptButton:Locator;

  constructor(page: Page) {
    super(page); // 3. Gọi lại constructor của cha (Bắt buộc)
    this.alertButton = page.getByRole('button', { name: 'Click for JS Alert' });
    this.resultText = page.locator('#result');
  }
  async openAlert() {
    // Không cần khai báo lại hàm goto, vì đã có navigate từ cha
    await this.Navigate('/javascript_alerts'); 
    await this.alertButton.click();
  }
  async triggerAlertByType(type: string) {
    switch (type.toLowerCase()) {
        case 'alert':
            await this.alertButton.click();
            break;
        case 'confirm':
            await this.confirmButton.click();
            break;
        case 'prompt':
            await this.promptButton.click();
            break;
        default:
            throw new Error(`Loại Alert "${type}" không hợp lệ! Vui lòng kiểm tra lại file JSON.`);
    };


    // 2. Kích hoạt nút bấm tương ứng
    if (type === 'alert') await this.alertButton.click();
    if (type === 'confirm') await this.confirmButton.click();
    if (type === 'prompt') await this.promptButton.click();
}}