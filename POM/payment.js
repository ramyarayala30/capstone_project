export class PaymentPage {
    constructor(page) {
        this.page = page;

        // URLs
        this.loginUrl = 'https://dine-dash--ramyarayala70.replit.app/login';
        this.menuUrl = 'https://dine-dash--ramyarayala70.replit.app/menu';
        this.cartUrl = 'https://dine-dash--ramyarayala70.replit.app/cart';

        // Login Locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';

        // Menu
        this.addToCartBtn = (id) => `[data-testid="add-to-cart-${id}"]`;

        // Payment Section
        this.paymentTitle = 'text=Payment Method';
        this.cardOption = '[data-test="payment-card"]';
        this.upiOption = '[data-test="payment-upi"]';
        this.codOption = '[data-test="payment-cod"]';
    }

    // Common Flow
    async login(email, password) {
        await this.page.goto(this.loginUrl);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async setupCart() {
        await this.page.goto(this.menuUrl);
        await this.page.click(this.addToCartBtn(1));
        await this.page.goto(this.cartUrl);
    }

    // Actions
    async selectCard() {
        await this.page.click(this.cardOption);
    }

    async selectUPI() {
        await this.page.click(this.upiOption);
    }

    async selectCOD() {
        await this.page.click(this.codOption);
    }
}