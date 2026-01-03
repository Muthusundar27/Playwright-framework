import { test, expect } from '@playwright/test'

test.describe('Transfer fund and Make payment',() => {

    test.beforeEach('Login page', async({page})=> {
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('.btn-primary')
    })

    test('Transfer: ', async({page}) => {
        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')

        await page.fill('#tf_amount', '500')
        await page.fill('#tf_description', 'test message')
        await page.click('text=Continue')

        //verify page
        const broadHeader = await page.locator('.board-header')
        await expect(broadHeader).toContainText('Verify')
        await page.click('#btn_submit')

        //confirm page
        const toastMessage = await page.locator('.alert-success')
        await expect(toastMessage).toContainText('You successfully submitted your transaction.')

    })
})