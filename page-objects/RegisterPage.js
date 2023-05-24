export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password') // te locatory sa case insensitive
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        // const emailId = uuidv4()
        // const email = emailId + "@gmail.com" //afec-123-c-244@gmail.com - wykomentowana druga wersja
        await this.emailInput.fill(email)
        // await this.emailInput.fill("jakismail@gmail.com") WYKOMENTOWANA WPISANA  za pierwszym razem WARTOSC, zanim uzywamy uuid
        // te wartosci za drugim testem beda juz nieaktualne, bo nie mozna zalozyc kilka razy takiego samego uzytkownika
        //(pomaga strona https://www.uuidgenerator.net/ i https://www.npmjs.com/package/uuid; dodajemy dependency do package json:
        // komenda: npm install --save uuid@9.0.0 [stan na dzien 14.04.2023)])
        await this.passwordInput.waitFor()
        // const password = uuidv4() - wykomentowana druga wersja
        await this.passwordInput.fill(password)
        // await this.passwordInput.fill("tajnehaslo") - wykomentowana pierwsza wersja
        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}