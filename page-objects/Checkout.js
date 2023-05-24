import { expect } from '@playwright/test'

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeFromBasketButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts() //allInnerTexts wymienia wartosci (ceny) produktów 
        // ['499$', '599$', '320$' ] -> [499, 599, 320] 
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "") //metoda replace - zamienia jedna wartosc na druga, tutaj $ zamieniony na "nic" 
            return parseInt(withoutDollarSign, 10)
        })

        const smallestPrice = Math.min(justNumbers) // Math - funkcja w JS 
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.removeFromBasketButton.nth(smallestPriceIdx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, { timemout: 3000 }) // zastosowany regular expression! regex101
    }
}