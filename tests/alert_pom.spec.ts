import { test, expect } from '@playwright/test';
import { AlertPage } from '../pages/AlertPage'; // Import Class vừa tạo
import alertData from '../data/dataAlert.json';
for (const data of alertData) {
test(`Test Alerts with Page Object Model ${data.id}, ${data.caseName}`, async ({ page }) => {
  const alertPage = new AlertPage(page);

  // 1. Đi tới trang
  await alertPage.openAlert();

  // 2. Test Prompt
  page.once('dialog', async dialog => {
    console.log(`Đang xử lý: ${dialog.type()}`);
    
    if (data.actionType === 'prompt') {
      await dialog.accept(data.input);
    } else if (data.actionType === 'confirm' && data.confirmAction === 'cancel') {
      await dialog.dismiss();
    } else {
      await dialog.accept();
    }
  });

  // Kích hoạt nút bấm tương ứng (Logic động)
  // Bạn có thể viết một hàm trong AlertPage để tìm nút dựa trên type
  await alertPage.triggerAlertByType(data.actionType);

  // Kiểm tra kết quả
  await expect(alertPage.resultText).toHaveText(data.expectedResult);
})};