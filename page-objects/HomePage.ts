import { Locator, Page } from "@playwright/test";

export class HomePage{
    //define selectors
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly feedbackLink: Locator

    //Init selectors using constuctor
    constructor(page:Page){
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBox = page.locator('#searchTerm') 
        this.feedbackLink = page.locator('#feedback')
    }

    //define methods
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com')
    }
    
    async clickOnSignInButton() {
        await this.signInButton.click()
    }

    async searchFor(searchTerm: string){
       await this.searchBox.fill(searchTerm)
       await this.page.keyboard.press('Enter')
    }

    async clickOnFeedbackUrl(){
        await this.feedbackLink.click()
    }
}