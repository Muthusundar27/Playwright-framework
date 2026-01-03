import { PlaywrightTestConfig } from '@playwright/test';

const config : PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: 'tests/api',
    use: {
        headless: false,
        viewport: {width: 1280, height: 720},
        actionTimeout: 10000,
        screenshot: 'off',
        video: 'off',
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