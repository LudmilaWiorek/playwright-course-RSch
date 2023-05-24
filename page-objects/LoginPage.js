export class LoginPage {
    constructor(page) {
        this.page = page
        this.moveToSingUpButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignUp = async () => {
        await this.moveToSingUpButton.waitFor()
        await this.moveToSingUpButton.click()
        this.page.waitForURL(/\/signup/, { timeout: 3000 })
    }
}
