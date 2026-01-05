import { test, expect } from '@playwright/test';
import { WindowsPage } from '../pages/WindowsPage';

test('Verify new page displays', async({page}) => {

const windowPage=new WindowsPage(page);
await windowPage.Navigate('/page');

  // 2. Click để mở tab mới và hứng lấy đối tượng tab đó
  const newTab = await windowPage.openNewWindow();

  // 3. Kiểm tra nội dung trên tab mới
  await expect(newTab.locator('h3')).toHaveText('New Window');

  // 4. Kiểm tra tiêu đề tab mới
  expect(await newTab.title()).toBe('New Window');

  // 5. Đóng tab mới và kiểm tra lại tab cũ
  await newTab.close();
  await expect(windowPage.headerText).toHaveText('Opening a new window');
})