import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export function createRealExcelFile(fileName: string) {
    const dataDir = path.resolve(__dirname, '../data');
    const filePath = path.join(dataDir, fileName);

    // 1. Tạo thư mục data nếu chưa có
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Kiểm tra xem file đã tồn tại chưa
    if (fs.existsSync(filePath)) {
        console.log(`File ${fileName} đã có sẵn, dùng luôn không tạo mới.`);
        return; 
    }
    // 2. Tạo dữ liệu mẫu
    const data = [
        ["VIN", "RecallCode", "Description"],
        ["VCI0001", "REC-01", "Test recall 1"],
        ["VCI0002", "REC-02", "Test recall 2"]
    ];

    // 3. Chuyển thành Buffer nhị phân chuẩn Excel
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 4. Ghi file - Lúc này file sẽ là nhị phân chuẩn, không phải text
    XLSX.writeFile(workbook, filePath);
    console.log(`✅ Đã tạo file Excel chuẩn tại: ${filePath}`);
}