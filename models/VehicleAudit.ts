import {IBaseResponse} from './BaseResponse'

export interface IVehicleAuditResponse extends IBaseResponse{
    transactions: any[] | null;
    defaultSettings: any | null;
    props: {
        traceId: string;
    };
}

export interface IVehicleAuditRequest {
    ClientCode: string;
    EntityId: string;
    EntityType: string;
    VehicleId: string;
}