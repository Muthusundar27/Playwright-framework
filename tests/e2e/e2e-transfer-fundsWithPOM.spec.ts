import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Transfer fund and Make payment',() => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach('Login page', async({page})=> {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
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