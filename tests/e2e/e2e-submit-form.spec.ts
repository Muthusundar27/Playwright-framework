import { test, expect } from '@playwright/test'

test.describe('Submit the form', () => {
    //before hook
test.beforeEach('Launch the website', async({page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
})
    // Reset feedback form
test('Reset feedback form', async({page}) => {

    await page.fill('#name', "Muthu")
    await page.fill('#email', "test12@gmail.com")
    await page.fill('#subject', "testing")
    await page.fill('#comment', "reset the form")
    await page.click("input[name='clear']")

    const nameInput = await page.locator("#name")
    const commentInput = await page.locator("#comment")
    await expect(nameInput).toBeEmpty
    await expect(commentInput).toBeEmpty

})
// Submit the feedback form
test('Submit feedback form', async({page}) => {
    await page.fill('#name', "Muthu")
    await page.fill('#email', "test12@gmail.com")
    await page.fill('#subject', "testing")
    await page.fill('#comment', "reset the form")
    await page.click("input[name='submit']")
    await page.waitForSelector('#feedback-title')
})
})