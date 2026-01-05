import { APIResponse } from "@playwright/test";

export interface ApiResponse<T> {
    data: T;              // Dữ liệu đã ép kiểu (Model)
    status: number;       // HTTP Status code (200, 400...)
    ok: boolean;          // Thành công hay thất bại
    rawResponse: APIResponse; // Đối tượng gốc của Playwright để check Header, v.v.
}