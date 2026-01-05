import { Locator, Page } from "@playwright/test";

export class BasePage{
    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async waitForElement(locator:Locator, timeout:number=30000){
        await locator.waitFor({state:'visible', timeout});
    }
    async clickElement(locator:Locator){
        await locator.click();
    }
    async getText(locator: Locator):Promise<string>{
        return await locator.textContent() || '';
    }
    async goto(path:string){
        await this.page.goto(path);
    }
    async uploadFile(locator:Locator, filePath: string){
        const path = require('path');
        const absolutePath = path.resolve(filePath);
        await locator.setInputFiles(absolutePath);
    }
    async waitForSpinFinished(selector: string = '.flexLoader'){
        const spinner = this.page.locator(selector);
    try {
        await spinner.waitFor({ state: 'hidden', timeout: 20000 });
    } catch (e) {
        console.warn('Spinner did not appear or was already hidden');
    }
    }
}