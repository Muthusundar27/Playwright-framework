import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedBackPage } from '../../page-objects/FeedbackPage'

test.describe('Submit the form', () => {
    let homePage: HomePage
    let feedBackPage: FeedBackPage

    //before hook
test.beforeEach('Launch the website', async({page}) => {
    homePage = new HomePage(page)
    feedBackPage = new FeedBackPage(page)
    await homePage.visit()
    await homePage.clickOnFeedbackUrl()
})

    // Reset feedback form
test('Reset feedback form', async({page}) => {
    await feedBackPage.fillForm('Muthu', 'test12@gmail.com', 'testing', 'reset the form')
    await feedBackPage.resetForm()
    await feedBackPage.assertReset()
})

// Submit the feedback form
test('Submit feedback form', async({page}) => {
    await feedBackPage.fillForm('Muthu', 'test12@gmail.com', 'testing', 'submit the form')
    await feedBackPage.submitForm()
   await feedBackPage.assertFeedbackTitle()
})
})