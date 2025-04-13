import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 60 * 1000,
    expect: {
        timeout: 5000,
    },

    testDir: './tests',
    fullyParallel: false,
    retries: process.env.CI ? 0 : 0,
    reporter: [['html', { open: "always" }]],
    use: {
        headless: false,
        screenshot: "on",
        video: "on",
        viewport: null
    },
    projects: [
        // {
        //     name: 'chromium',
        //     use: { ...devices['Desktop Chrome'] }
        // },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        // {
        //     name:'webkit',
        //     use:{...devices['Desktop Safari']}
        // }
    ]
})