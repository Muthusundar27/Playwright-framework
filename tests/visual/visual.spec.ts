import { test, expect } from '@playwright/test'

test.describe.only('Visual Regression Test for example', () => {

    test("Full Page Snapshots", async({ page }) => {
        await page.goto('https://www.example.com/')
        expect(await page.screenshot()).toMatchSnapshot('Home.png')
    })

    test('Single Element Snapshots', async({ page }) => {
        await page.goto('https://www.example.com/')
        const pageElement = await page.$('h1')
        expect(await pageElement?.screenshot()).toMatchSnapshot('Page-Title.png')
    })

})
