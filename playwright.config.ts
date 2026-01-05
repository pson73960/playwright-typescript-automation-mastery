import { defineConfig, devices } from '@playwright/test';
import { Config } from './utils/environment';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  expect: {
    timeout: 10000, // Timeout mặc định cho các lệnh expect (10 giây)
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: Config.baseUrl, // Dùng trực tiếp từ Config object
    actionTimeout: Config.timeout,
    /* Base URL to use in actions like `await page.goto('')`. */
    //baseURL: 'https://practice.expandtesting.com',
    launchOptions: {
      slowMo: process.env.CI ? 0 : 200, // Nó sẽ dừng 1 giây (1000ms) sau mỗi hành động (click, fill...)
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: process.env.CI ? true : false,
    //screenshot: 'only-on-failure',
  // Quay video cho mỗi bài test (hoặc 'retain-on-failure' để chỉ giữ video bài lỗi)
  //video: 'on',
  // Ghi lại Trace (dòng thời gian chi tiết) để debug cực xịn
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    //{ name: 'setup', testMatch: /.*\.setup\.ts/ },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
    //   dependencies: ['setup'],
    // }
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
    }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
