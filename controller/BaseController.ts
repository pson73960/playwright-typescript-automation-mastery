import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiResponse } from "../models/APIResponse";
export class BaseController{
    protected request: APIRequestContext;
    protected token: string;
    protected domain: string
    protected serviceUrl: string
    constructor(request: APIRequestContext, serviceName: string, token: string = '') {
        this.request = request;
        this.token = token;
        const env = process.env.ENV || 'qa';
        this.domain = `${env}.flex.cafe`;
        this.serviceUrl = `https://${this.domain}/api/v1/${serviceName}`;
    }

    protected GetHeaders(){
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }
    protected async handleResponse<T>(response: APIResponse): Promise<ApiResponse<T>> {
        return {
            data: await response.json() as T,
            status: response.status(),
            ok: response.ok(),
            rawResponse: response
        };
    }
}