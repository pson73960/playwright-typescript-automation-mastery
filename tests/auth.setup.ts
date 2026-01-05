import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via UI', async ({ page }) => {
  if (process.env.NO_AUTH) {
    console.log('Chế độ NO_AUTH: Bỏ qua bước setup này');
    return; // Thoát sớm
  }
  // 1. Đi tới trang login thực tế
  await page.goto('https://vciadmin.qa.flex.cafe');

  // 2. Điền form bằng giao diện (Để trình duyệt tự xử lý mọi Cookie/Header)
  await page.locator('#username').fill('automation_seller');
  await page.locator('#password').fill('Password1!');
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForLoadState('networkidle');
  // 3. Phải đợi cho đến khi đăng nhập xong thực sự
  await expect(page.locator('h2').first()).toContainText('VIN');

  // 4. Lưu trạng thái từ 'page' (chứ không phải 'request')
  await page.context().storageState({ path: authFile });
  console.log("Đã lưu Storage State bằng UI thành công!");
});