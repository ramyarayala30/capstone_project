export class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';
        this.errorMessage = 'text=Invalid email or password';
        this.invalidEmailText = 'text=Invalid email';
        this.form = 'form';
    }

    // Actions
    async goto() {
        await this.page.goto('https://dine-dash--ramyarayala70.replit.app/login');
    }

    async enterEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async login(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}