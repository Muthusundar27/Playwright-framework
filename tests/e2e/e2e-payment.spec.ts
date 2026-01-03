import {test, expect} from '@playwright/test'

test.describe('Send Payment: ', () => {
    test.beforeEach('Login page', async({page})=> {
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('.btn-primary')
    })

    test('Should send the payment: ', async({page}) => {
        await page.click('#pay_bills_tab')
        const verifyTab = await page.locator('.board-header')
        await expect(verifyTab).toContainText('payees')
        await page.selectOption('#sp_payee', 'Bank of America')
        await page.click('#sp_get_payee_details')
        await page.waitForSelector('#sp_payee_details')
        await page.selectOption('#sp_account', '3')
        await page.fill('#sp_amount', '200')
        await page.fill('#sp_date', '2025-12-27')
        await page.fill('#sp_description', "test messgae")
        await page.click('#pay_saved_payees')

        const successMessage = await page.locator('#alert_container')
        await expect(successMessage).toBeVisible
        await expect(successMessage).toContainText('The payment was successfully submitted.')
        await page.click('.close')
    }) 
})