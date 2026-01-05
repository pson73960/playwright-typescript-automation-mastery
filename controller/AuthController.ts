import { APIRequestContext } from "@playwright/test";
import { BaseController } from "./BaseController";
export class AuthController extends BaseController{
    constructor(request: APIRequestContext) {
        super(request,'auth','')
    }
    async Login(username: string, password: string){
        console.log(`Calling API: ${this.serviceUrl}/authenticateuser`);
        const response = await this.request.post(`${this.serviceUrl}/authenticateuser`,{
            data:{
                username : username,
                password : password
            }
        });
        const body = await response.json();
        if (response.status() === 400) {
        // ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT ĐỂ ĐỌC LOG
        const errorDetail = await response.text(); 
        console.error(`Lỗi 400 chi tiết từ Server: ${errorDetail}`);
        
        // Hoặc nếu Server trả về JSON lỗi
        // console.error(await response.json());
        }
        return {
        token: body.token,
        userId: body.userId,
        csrfToken: body.session.csrfToken,
        sessionUser: body.session.user, // Lấy nguyên cục User Profile
        currentDomain: this.domain
    };
    }
    // async GetToken(username: string, password: string){
    //     const response = await this.Login(username, password);
    //     const body = await response.json();
    //     return body.token;
    // }
}