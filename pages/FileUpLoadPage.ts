import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FileUpLoadPage extends BasePage{
    readonly fileType:Locator;
    readonly inputFile: Locator;
    readonly uploadButton: Locator;
    readonly messageSuccess:Locator;
    constructor(page:Page) {
        super(page);
        this.fileType = page.locator('#fileTypes');
        this.inputFile = page.locator('input[name="myFile"]');
        this.uploadButton = page.getByRole('button', {name: 'Upload'});
        this.messageSuccess = page.locator('.upload-files__alert');
    }

    async selectFileType(option: string){
        await this.page.waitForLoadState('networkidle');
        await this.waitForElement(this.fileType);
        await this.fileType.selectOption(option);
    }
    async uploadDocument(relativeFilePath: string){
        await this.uploadFile(this.inputFile, relativeFilePath);
    }
    async clickSubmit(){
        await this.uploadButton.click();
    }
}