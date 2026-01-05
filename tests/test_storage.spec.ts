import { test, expect } from '@playwright/test';

test('Test dùng chung Context xịn', async ({ page }) => {
  // Tạo một context mới và NẠP file JSON ngay tại đây

  await page.goto('https://vciadmin.qa.flex.cafe');
  await expect(page.locator('h2').first()).toContainText('VIN');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('dashboard-home.png');
});