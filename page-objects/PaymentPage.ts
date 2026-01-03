import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    //define selectors
    readonly page: Page
    readonly payeeSelectBox: Locator
    readonly payeeDetailButton: Locator
    readonly payeeDetail: Locator
    readonly accountSelectBox: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPayButton: Locator
    readonly messgae: Locator

    //constructor
    constructor (page:Page){
        this.page = page
        this.payeeSelectBox = page.locator('#sp_payee')
        this.payeeDetailButton = page.locator('#sp_get_payee_details')
        this.payeeDetail = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.amountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPayButton = page.locator('#pay_saved_payees')
        this.messgae = page.locator('#alert_container')
    }

    //methods
    async createPayment(){
       await this.payeeSelectBox.selectOption('apple')
       await this.payeeDetailButton.click()
       await expect(this.payeeDetail).toBeVisible()
       await this.accountSelectBox.selectOption('3')
       await this.amountInput.fill('500')
       await this.dateInput.fill('2025-12-27')
       await this.descriptionInput.fill('Test')
       await this.submitPayButton.click()
    }
    async assertSuccessMessage() {
       await expect(this.messgae).toBeVisible()
       await expect(this.messgae).toContainText('The payment was successfully submitted.')
    }
}