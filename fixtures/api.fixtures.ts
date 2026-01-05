import { AuthController } from "../controller/AuthController";
import { VehicleController } from "../controller/VehicleController";
import { test as base, expect, Page } from '@playwright/test';
import { Config } from "../utils/environment";
type APIFixtures = {
    authController: AuthController;
    authenPage: Page;
    vehicleController: VehicleController;
};

export const test = base.extend<APIFixtures>({
    authController: async ({ request }, use) => {
        await use(new AuthController(request));
    },
    authenPage: async ({ page, context, authController }, use) => {
        // Gọi login từ authController đã khai báo ở trên
        const authData = await authController.Login(
            Config.credential.adminUser, 
            Config.credential.adminPass
        );
        await context.setExtraHTTPHeaders({
        'Authorization': `Bearer ${authData.token}`,
        'x-csrf-token': authData.csrfToken,
        'flex-context': `${authData.currentDomain}||https://${authData.currentDomain}/inventory/listing|null`,
        'Origin': 'https://vciadmin.qa.flex.cafe', // Thêm dòng này
        'Referer': 'https://vciadmin.qa.flex.cafe/',
        });
        await page.goto('https://vciadmin.qa.flex.cafe/login');
        // Bơm Cookies
       await page.evaluate((data) => {
    // Bơm Token
    localStorage.setItem('token', data.token);
    localStorage.setItem('flex-st', data.token);
    
    // Bơm thông tin User (Nhiều UI dựa vào cái này để vẽ Menu/Header)
    localStorage.setItem('userId', data.userId);
    // Nếu có object user, hãy lưu dưới dạng chuỗi JSON
    localStorage.setItem('currentUser', JSON.stringify(data.sessionUser)); 
}, { 
    token: authData.token, 
    userId: authData.userId, 
    sessionUser: authData.sessionUser
});

    // 4. Bơm Cookie đích danh cho vciadmin
    await context.addCookies([{
        name: 'flex-st',
        value: authData.token,
        domain: 'vciadmin.qa.flex.cafe',
        path: '/'
    }]);

    await use(page);
    },
    vehicleController: async({request},use)=>{
        const authController = new AuthController(request);
        // Login nhanh để lấy token cho API
        const authData = await authController.Login(Config.credential.adminUser, Config.credential.adminPass);
        await use(new VehicleController(request, 'workbench', authData.token))
    }
});
export { expect };
