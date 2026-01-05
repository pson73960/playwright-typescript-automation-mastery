import { LoginPages } from "../pages/LoginPages";
import {HomePage} from "../pages/HomePage";
import {test as base} from "@playwright/test";
import { FileUpLoadPage } from "../pages/FileUpLoadPage";
import { WorkbenchPage } from "../pages/WorkBenchPage";
type PageFixture = {
    loginPage: LoginPages;
    homepage: HomePage;
    fileUpLoadPage: FileUpLoadPage;
    workbenchPage: WorkbenchPage;
};

export const test = base.extend<PageFixture>({
    loginPage: async({page}, use)=>{
        await use(new LoginPages(page));
    },
    homepage: async({page}, use)=>{
await use(new HomePage(page));
    },
    fileUpLoadPage: async({page},use)=>{
        await use(new FileUpLoadPage(page));
    },
    workbenchPage: async({page},use)=>{
        await use(new WorkbenchPage(page));
    }
});
export {expect} from '@playwright/test'