import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { PaymentPage  } from '../../page-objects/PaymentPage'



test.describe('Send Payment: ', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navBar: Navbar
    let paymentPage: PaymentPage

    test.beforeEach('Login page', async({page})=> {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new Navbar(page)
        paymentPage = new PaymentPage(page)
        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login('username', 'password')
    })

    test('Should send the payment: ', async({page}) => {
        await navBar.clickOnTab('Pay Bills')
        const verifyTab = await page.locator('.board-header')
        await expect(verifyTab).toContainText('payees')
        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    }) 
})