import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'
import { isDesktopViewport } from '../utils/isDesktopViewport.js'
export class ProductsPage {

    constructor(page) {         //konstruktor to metoda!
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {       //visit to funkcja
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")

        const navigation = new Navigation(this.page)

        //only runs on desktop viewport! not on mobile

        let basketCountBeforeAdding //zostawiamy undefined
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }

        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")

        //only runs on desktop viewport! not on mobile 

        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()       //u want to check that this exist
        await this.productTitle.first().waitFor()

        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")

        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)
    }
}
