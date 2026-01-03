import {test, expect} from '@playwright/test'

test.describe('Filter Transactions: ', () => {
    test.beforeEach('Login page', async({page})=> {
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('.btn-primary')
    })

    test('Filter transaction', async({page}) => {
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')
        
        const checkingAccounts = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccounts).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccounts =  await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccounts).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const brokerage = await page.locator('.well')
        await expect(brokerage).toBeVisible
    })
})