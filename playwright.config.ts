import { PlaywrightTestConfig } from '@playwright/test';

const config : PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: false,
        viewport: {width: 1280, height: 720},
        actionTimeout: 15000,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true

    },
    projects: [
        {
            name: 'Chromium',
            use: {
                browserName: 'chromium'
            }
        },
        {
            name: 'Firefox',
            use: {
                browserName: 'firefox'
            }
        },
        {
            name: 'Webkit',
            use: {
                browserName: 'webkit'
            }
        }
    ]
}

export default config