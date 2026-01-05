import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from '../data/loginData.json';
for(const data of loginData){
test(`Verify login page ${data.id} and ${data.username}`, async({page})=>{
    
const loginPage= new LoginPage(page);
    await loginPage.openPage();
    await loginPage.login(data.username,data.password);
    await expect(page.locator('#flash')).toContainText(data.expectedMessage);
})}