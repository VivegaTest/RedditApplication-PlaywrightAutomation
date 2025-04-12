import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',
    fullyParallel: false,
    retries: process.env.CI ? 0 : 0,
    reporter: [['html', { open: "always" }]],
    use: {
        headless: false,
        screenshot: "on",
        video: "on"
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