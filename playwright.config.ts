import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', { open: "always" }]],
    use: {
        headless: true,
        screenshot: "on",
        video: "on"
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        // {
        //     name:'firefox',
        //     use:{...devices['Desktop Firefox']}
        // },
        // {
        //     name:'webkit',
        //     use:{...devices['Desktop Safari']}
        // }
    ]
})