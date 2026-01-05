import { expect, test } from "@playwright/test";


test('Verify login page claude',async ({page})=>{
    await page.goto('/register');
await page.locator('#username').fill('sonpham');
await page.locator('#password').fill('vanhuthe');
await page.locator('#confirmPassword').fill('vanhuthe');
await page.getByRole('button',{name: 'Register'}).click();
await expect(page.locator('#flash')).toHaveText(/Successfully registered, you can log in now/);

});

test('Verify checkbox page claude',async ({page})=>{
    await page.goto('/checkboxes');
    const checkBox1= page.locator('#checkbox1');
await checkBox1.check();
await expect(checkBox1).toBeChecked();


});

test('Verify dropdown page claude',async ({page})=>{
    await page.goto('/dropdown');
    await page.selectOption('#dropdown', '1');
await expect(page.locator('#dropdown')).toHaveValue('1');


});