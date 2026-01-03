import { test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'


test.describe('Search Results: ', () => {
    test('Should find search results', async({page}) => {
        //Avoid initialize the variable in hook becoz in this class we have only one test, if it is multiple tests you should be follow the initialize variable in hooks part for avoid duplication code
        let homePage: HomePage = new HomePage(page)
        await homePage.visit()
        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
    })
})