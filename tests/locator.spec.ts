import {expect, test} from '@playwright/test';

test.describe('Verify locator', ()=>{

    test('drag and drop', async ({page})=>{
        await page.goto('https://practice.expandtesting.com/drag-and-drop');
        await page.locator('#column-a').dragTo(page.locator('#column-b'));
        expect(page.locator('#column-a')).toHaveText('B');
    });
    test('should show hidden content on hover', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/hovers');
        
        // TODO: Hover over first image
        await page.locator('.figure').first().hover();
        
        // TODO: Verify "name: user1" appears
        await expect(page.locator('.figcaption').first()).toContainText('user1');
      });
      test('should validate number input', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/inputs');
        
        // TODO: Fill input with number 12345
        await page.locator('input[type="number"]').fill('12345');
        
        // TODO: Verify value is correct
        await expect(page.locator('input[type="number"]')).toHaveValue('12345');
      });
    
      // ========================================
      // BÀI 4: Key Presses
      // ========================================
      test('should capture key press', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/key-presses?');
        
        // TODO: Click on input and type 'Enter'
        const input = page.locator('#target');
  
  // ⭐ Click vào input để focus trước
  await input.click();
  
        
        // TODO: Verify result shows "You entered: ENTER"
        await input.press('A');
        await expect(page.locator('#result')).toContainText('A');
        
        // Hoặc
        await input.press('Space');
        await expect(page.locator('#result')).toContainText('SPACE');
        
        // Hoặc
        await input.press('ArrowUp');
        await expect(page.locator('#result')).toContainText('UP');
      });
      test('should handle new window', async ({ page, context }) => {
        await page.goto('https://practice.expandtesting.com/windows');
        
        // TODO: Click "Click Here" link and handle new window
        // Hint:
        const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name: 'Click Here' }).click()
        ]);
        
        // TODO: Wait for new page to load
        await newPage.waitForLoadState();
        
        // TODO: Verify new page title contains "New Window"
        await expect(newPage).toHaveTitle(/new window/i);
        await newPage.close();
      });
})