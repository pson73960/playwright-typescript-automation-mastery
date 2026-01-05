import testData from '../data/testData.json';
import {test, expect} from '../fixtures/page.fixtures';

testData.forEach(data => {
    test(`verify with ${data.model} and ${data.expectedCount}`, async({loginPage, homepage, workbenchPage})=>{
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
})