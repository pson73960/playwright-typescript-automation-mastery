import { BaseController } from "./BaseController";
import {IVehicleAuditRequest,IVehicleAuditResponse} from "../models/VehicleAudit"
import { ApiResponse } from "../models/APIResponse";
export class VehicleController extends BaseController{

    async GetAuditForVehicle(payload: IVehicleAuditRequest):Promise<ApiResponse<IVehicleAuditResponse>>{
        const response = await this.request.post(`${this.serviceUrl}/GetAuditForVehicle`,
            {headers:this.GetHeaders(),
                data:payload               
            }
        );
         if (response.status() === 400) {
        // ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT ĐỂ ĐỌC LOG
        const errorDetail = await response.text(); 
        console.error(`Lỗi 400 chi tiết từ Server: ${errorDetail}`);
        
        // Hoặc nếu Server trả về JSON lỗi
        // console.error(await response.json());
        }
        return await this.handleResponse<IVehicleAuditResponse>(response);
    }
}