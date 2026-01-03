import { expect, Locator, Page} from '@playwright/test'

export class FeedBackPage{
    //define selectors
    readonly page: Page
    readonly userNameInput: Locator
    readonly userEmailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly sendMessageButton: Locator
    readonly clearButton: Locator
    readonly feedbackTitle: Locator

    //constructors
    constructor(page: Page){
        this.page = page
        this.userNameInput = page.locator('#name')
        this.userEmailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.sendMessageButton = page.locator("input[name='submit']")
        this.clearButton = page.locator("input[name='clear']")
        this.feedbackTitle = page.locator('#feedback-title')
    }

    async fillForm(name: string, email: string, subject: string, comment: string) {
        await this.userNameInput.fill(name)
        await this.userEmailInput.fill(email)
        await this.subjectInput.fill(subject)
        await this.commentInput.fill(comment)
    }

    async resetForm(){
        await this.clearButton.click()
    }

    async submitForm(){
        await this.sendMessageButton.click()
    }

    async assertReset(){
        await expect(this.userNameInput).toBeEmpty()
        await expect(this.userEmailInput).toBeEmpty() 
    }

    async assertFeedbackTitle() {
        await expect(this.feedbackTitle).toBeVisible()
    }
}