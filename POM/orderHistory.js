export class OrdersPage {
    constructor(page) {
        this.page = page;

        // URLs
        this.loginUrl = 'https://dine-dash--ramyarayala70.replit.app/login';
        this.ordersUrl = 'https://dine-dash--ramyarayala70.replit.app/orders';

        // Login Locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';

        // Orders Page Locators
        this.pageTitle = 'text=Order History';
        this.orderCards = 'div.shadow-sm';
        this.orderCardsAlt = 'div.rounded-3xl';
        this.quantity = 'span.font-semibold';
        this.price = 'span.text-muted-foreground';
        this.itemName = 'span.font-medium';
        this.priceSymbol = 'text=/\\$/';
        this.date = 'text=/\\d{1,2}:\\d{2}/';
    }

    // Actions
    async login(email, password) {
        await this.page.goto(this.loginUrl);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async gotoOrders() {
        await this.page.goto(this.ordersUrl);
    }

    // Getters
    async getOrderCount() {
        return await this.page.locator(this.orderCardsAlt).count();
    }

    async getFirstQuantity() {
        return await this.page.locator(this.quantity).first().textContent();
    }

    async getFirstPrice() {
        return await this.page.locator(this.price).last().textContent();
    }

    async getFirstDate() {
        return await this.page.locator(this.date).first().textContent();
    }
}