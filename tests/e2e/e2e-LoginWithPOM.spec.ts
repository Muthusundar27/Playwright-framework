import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'


test.describe.parallel('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage

    // before hook
    test.beforeEach('Hook', async({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
    })

    //Negative scenario
    test('Negative scenario', async({page}) => {
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    // Positive scenario - logout flow
    test('Positive Flow Login / Logout', async({page}) => {
        await loginPage.login('username', 'password')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})