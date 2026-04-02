export class MenuPage {
    constructor(page) {
        this.page = page;

        // URLs
        this.menuUrl = 'https://dine-dash--ramyarayala70.replit.app/menu';
        this.loginUrl = 'https://dine-dash--ramyarayala70.replit.app/login';

        // Menu Locators
        this.foodItems = '.p-5';
        this.searchInput = '[data-test="search-input"]';
        this.prices = '.font-bold.text-primary.text-lg.whitespace-nowrap';
        this.toastMessage = 'div.text-sm.font-semibold';

        // Dynamic locators
        this.menuItem = (id) => `[data-testid="menu-item-${id}"]`;
        this.menuImage = (id) => `[data-testid="menu-item-image-${id}"]`;
        this.addToCartBtn = (id) => `[data-testid="add-to-cart-${id}"]`;
        this.description = (id) => `#menu-item-description-${id}`;

        // Login locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';
    }

    // Navigation
    async gotoMenu() {
        await this.page.goto(this.menuUrl);
    }

    async gotoLogin() {
        await this.page.goto(this.loginUrl);
    }

    // Actions
    async search(text) {
        await this.page.fill(this.searchInput, text);
    }

    async hoverItem(id) {
        await this.page.hover(this.menuItem(id));
    }

    async addToCart(id) {
        await this.page.click(this.addToCartBtn(id));
    }

    async login(email, password) {
        await this.gotoLogin();
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    // Getters
    async getAllPrices() {
        return await this.page.locator(this.prices).allTextContents();
    }
}