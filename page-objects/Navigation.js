import { isDesktopViewport } from '../utils/isDesktopViewport.js'

export class Navigation {

    constructor(page) {         //konstruktor to metoda 
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.burgerButton = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText() // ! innerText to metoda locatora; zwraca string! dlatego chcemy zmienic ten string na liczbę 
        const asNumber = parseInt(text, 10) //string convertuje na liczbę; 10 - decimal system
        return asNumber
    }

    //true if desktop
    //false if mobile -> reverse false -> !false === !true

    goToCheckout = async () => {
        // if mobile viewport, first open the burger menu
        if (!isDesktopViewport(this.page)) { //"!" oznacza "NOT"
            await this.burgerButton.waitFor()
            await this.burgerButton.click()
        }

        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket") // ZWRACAC UWAGE NA WIELKOSC LITER W METODACH ! (URL)
    }
}