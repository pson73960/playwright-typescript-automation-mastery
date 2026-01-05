import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'qa';

dotenv.config({
    path: path.resolve(__dirname, `../.env.${ENV}`)
});

export const Config = {
    baseUrl: process.env.BASE_URL as string,
    credential:{
        adminUser: process.env.ADMIN_USER as string,
        adminPass: process.env.ADMIN_PASSWORD as string,
    },
    timeout: parseInt(process.env.TIMEOUT || '30000'),
    isQA: ENV === 'qa',
    isUat: ENV === 'uat'
}