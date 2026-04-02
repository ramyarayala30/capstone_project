// pages/RegistrationPage.js

export class RegistrationPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.nameInput = '#name-input';
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.confirmPasswordInput = '#confirm-password-input';
        this.registerButton = '[data-test="register-button"]';
        this.errorMessage = 'text=Invalid email address';
        this.passwordErrorMessage = 'text=Password must be at least 6 characters';
        this.emailErrorMessage = 'text=Invalid email address';
        this.nameErrorMessage = 'text=Name must be at least 2 characters';
        this.specialCharErrorMessage = 'text=Invalid name: only letters, spaces, hyphens and apostrophes are allowed';
        this.emailAlreadyRegisteredMessage = 'text=Email already registered';
        this.form = 'form';
    }

    // Actions
    async goto() {
        await this.page.goto('https://dine-dash--ramyarayala70.replit.app/register');
    }

    async enterName(name) {
        await this.page.fill(this.nameInput, name);
    }

    async enterEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async enterConfirmPassword(password) {
        await this.page.fill(this.confirmPasswordInput, password);
    }

    async clickRegister() {
        await this.page.click(this.registerButton);
    }

    async register(name, email, password, confirmPassword) {
        await this.enterName(name);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.clickRegister();
    }

    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).first();
    }

    async getPasswordErrorMessage() {
        return await this.page.locator(this.passwordErrorMessage).first();
    }

    async getNameErrorMessage() {
        return await this.page.locator(this.nameErrorMessage).first();
    }

    async getSpecialCharErrorMessage() {
        return await this.page.locator(this.specialCharErrorMessage).first();
    }

    async getEmailAlreadyRegisteredMessage() {
        return await this.page.locator(this.emailAlreadyRegisteredMessage).first();
    }
}