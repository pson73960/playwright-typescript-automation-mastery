
export interface IBaseResponse{
    code: string;
    httpStatus: number;
    isValid: boolean;
    serverTime: string;
    errors?: Array<{
        code: string;
        summary: string;
    }>;
}