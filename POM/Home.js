export class HomePage {
    constructor(page) {
        this.page = page;

        // URLs
        this.homeUrl = 'https://dine-dash--ramyarayala70.replit.app';
        this.loginUrl = 'https://dine-dash--ramyarayala70.replit.app/login';

        // Navbar Locators
        this.homeLink = '[data-test="nav-home-link"]';
        this.menuLink = '[data-test="nav-menu-link"]';
        this.ordersLink = '[data-test="nav-orders-link"]';
        this.cartLink = '[data-test="nav-cart-link"]';
        this.logoutButton = '[data-test="logout-button"]';

        // Other Elements
        this.navbar = 'nav';
        this.logo = 'a[href="/"]';
        this.navLinks = 'nav a';

        // Login Locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';
    }

    // Navigation
    async gotoHome() {
        await this.page.goto(this.homeUrl);
    }

    async gotoLogin() {
        await this.page.goto(this.loginUrl);
    }

    // Actions
    async clickMenu() {
        await this.page.click(this.menuLink);
    }

    async clickOrders() {
        await this.page.click(this.ordersLink);
    }

    async clickCart() {
        await this.page.click(this.cartLink);
    }

    async clickLogo() {
        await this.page.click(this.logo);
    }

    async clickLogout() {
        await this.page.click(this.logoutButton);
    }

    // Login (Reusable)
    async login(email, password) {
        await this.gotoLogin();
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
}