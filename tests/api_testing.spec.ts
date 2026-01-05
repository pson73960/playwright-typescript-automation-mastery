import {test, expect} from '@playwright/test';

test('Verify Api testing', async ({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Status Code thực tế là: ' + response.status());
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
});
test.describe('verify api  page', ()=>{
const baseURL=('https://jsonplaceholder.typicode.com');
test('GET - Retrieve a post', async({request})=>{
    const response = await request.get(`${baseURL}/posts/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Kiểm tra cấu trúc dữ liệu trả về
    expect(body.id).toBe(1);
    expect(body.userId).toBeDefined();
    expect(typeof body.title).toBe('string');
    console.log('Post Title:', body.title);
});
test('Post - test post api', async ({request})=>{
    const response = await request.post(`${baseURL}/posts`,{
        data: {
          title: 'Học Playwright cùng Gemini',
          body: 'API Testing thật là thú vị!',
          userId: 1,
        }});
        expect(response.status()).toBe(201);
        const body = await response.json();
    
    expect(body.title).toBe('Học Playwright cùng Gemini');
    expect(body.id).toBe(101);
});
test('PUT - Update a post', async ({ request }) => {
    const response = await request.put(`${baseURL}/posts/1`, {
        data: {
            id: 1,
            title: 'Tiêu đề đã sửa',
            body: 'Nội dung đã sửa',
            userId: 1
          }
        });
        expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.title).toBe('Tiêu đề đã sửa');
  });
  test('DELETE - Remove a post', async ({ request }) => {
    const response = await request.delete(`${baseURL}/posts/1`);
    
    // JSONPlaceholder trả về 200 cho lệnh DELETE thành công
    expect(response.status()).toBe(200); 
    console.log('Xóa thành công post id 1');
  });
});