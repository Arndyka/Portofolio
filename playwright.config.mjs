import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 3,
  use: { baseURL: 'http://127.0.0.1:4185', headless: true, channel: process.env.CI ? undefined : 'msedge', screenshot: 'only-on-failure' },
  webServer: { command: 'node scripts/serve.mjs', url: 'http://127.0.0.1:4185/health', reuseExistingServer: !process.env.CI },
  reporter: [['list']],
});
