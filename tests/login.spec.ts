import {test, expect} from '../fixtures/page.fixtures';
import { createRealExcelFile } from '../utils/createTestData';

test('Verify login function', async({loginPage, homepage, fileUpLoadPage})=>{
    const fileName = 'test_upload_real.xlsx';
    createRealExcelFile(fileName);
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();

    // const successMessage = await loginPages.getSuccessMessage();
    // expect(successMessage).toContain('success');

    await homepage.waitForButtonLogout();
    await expect(loginPage.page).not.toHaveURL(/login/);
    await expect(homepage.logoutButton).toBeVisible();
    await homepage.goToFileUploadPage();
    await expect(homepage.page).toHaveURL(/filetransferupload-admin/);
    await fileUpLoadPage.selectFileType('VCI_RECALL_ORCH.');
    await fileUpLoadPage.uploadDocument(`data/${fileName}`); 
    
    // Đừng quên click nút Submit/Upload sau đó nhé!
    await fileUpLoadPage.clickSubmit();
    await expect(fileUpLoadPage.messageSuccess).toContainText('Your file has been uploaded to the server. Please check email.');
});
test('Go to research vin page and input Vin Number',async({loginPage, homepage, workbenchPage})=>{
    await loginPage.navigateToLogin();
    await loginPage.loginWithValidCredentials();

    await homepage.gotoInventoryPage();
    await workbenchPage.gotoResearchVins();
    const count = await workbenchPage.getFilterCount();
    expect(count).toBe(25);
    const chosenVin = await workbenchPage.getRandomAndInputVin();
    expect(workbenchPage.inputVin).toHaveValue(chosenVin);
    const numberOfResult = await workbenchPage.getResultAvailableVin();
    expect(numberOfResult).toBeGreaterThanOrEqual(1);
    expect(workbenchPage.firstResultVinRow).toContainText(chosenVin);
    await workbenchPage.verifyAllResultsShowModel('Volkswagen');
})