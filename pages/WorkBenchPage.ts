import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class WorkbenchPage extends BasePage{
    readonly viewVehicleDropdown: Locator;
    readonly findVehicleLink: Locator;
    readonly filterItems: Locator;
    readonly vinItems: Locator;
    readonly inputVin: Locator;
    readonly searchButton: Locator;
    readonly resultVinCount: Locator;
    readonly firstResultVinRow: Locator;
    readonly tableOfVehicle: Locator;
    constructor(page:Page){
        super(page);
        this.viewVehicleDropdown = page.locator('#IWantToLi');
        this.findVehicleLink = page.locator('#linkFIND_VEHICLES');
        this.filterItems = page.locator('.row .form-group');
        this.vinItems = page.locator('.vin');
        this.inputVin = page.locator('#txt-VIN');
        this.searchButton = page.locator('#btnSearch');
        this.resultVinCount= page.locator('#vehicleavailablecount');
        this.firstResultVinRow= page.locator('#VehicleRow-1').filter({has: this.vinItems});
        this.tableOfVehicle = page.locator('.workbench-vehicle-list').nth(1);
    }
    async gotoResearchVins(){
        await this.viewVehicleDropdown.hover();
        await this.waitForElement(this.findVehicleLink);
        await this.findVehicleLink.click();
        await this.waitForSpinFinished();
    }
    async getFilterCount(): Promise<number> {
        return await this.filterItems.count();
    }
    async getRandomAndInputVin(){
        const allVins = await this.vinItems.allTextContents();
        if (allVins.length === 0) {
            throw new Error("Không tìm thấy danh sách VIN nào có class '.vin'");
        }
        const randomIndex = Math.floor(Math.random() * allVins.length);
        const selectedVin = allVins[randomIndex].trim();
        await this.inputVin.fill(selectedVin);
        await this.searchButton.click();
        await this.waitForSpinFinished();
        return selectedVin;
    }
    async getResultAvailableVin(): Promise<number>{
        const fullText = await this.resultVinCount.first().textContent();
        if (!fullText) return 0;
    const cleanNumber = fullText.replace(/[^0-9]/g, ''); 
    
    return cleanNumber ? parseInt(cleanNumber, 10) : 0;  
    }
    async verifyAllResultsShowModel(expectedModel: string = 'Volkswagen|Audi'){
        const listVins = await this.tableOfVehicle.all();
        const modelRegex = new RegExp(expectedModel,'i');
        for (const row of listVins){
           await expect(row).toContainText(modelRegex);
        }
    }
}