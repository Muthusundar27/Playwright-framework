import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'


test.describe('Filter Transactions: ', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach('Login page', async({page})=> {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
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