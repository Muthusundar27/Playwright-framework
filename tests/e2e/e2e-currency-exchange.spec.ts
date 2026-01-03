import { test, expect } from '@playwright/test'

test.describe('Currency Exchange test: ', () => {

    test.beforeEach('Login page', async({page})=> {
        await page.goto('http://zero.webappsecurity.com/login.html')
        await page.fill('#user_login', 'username')
        await page.fill('#user_password', 'password')
        await page.click('.btn-primary')
    })

    test('Purchase foreign currency cash', async({page}) => {
        await page.click('#pay_bills_tab')
        const verifyTab = await page.locator('.board-header')
        await expect(verifyTab).toContainText('payees')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'SGD')
        const sellRate =  await page.locator('#sp_sell_rate')
        await expect(sellRate).toBeVisible
        await expect(sellRate).toContainText('SGD')

        await page.fill('#pc_amount', '100')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toBeVisible
        await expect(conversionAmount).toContainText('dollar')
        await page.click('#purchase_cash')
        const successMessgae = await page.locator('#alert_content')
        await expect(successMessgae).toBeVisible
        await expect(successMessgae).toContainText('Foreign currency cash was successfully purchased.')

    })

})