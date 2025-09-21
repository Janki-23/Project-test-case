import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect : {
      timeout: 50 * 1000
  },
  reporter: 'html',
  use: {

    baseURL: 'https://reactdemo.equityfundingscript.com',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
