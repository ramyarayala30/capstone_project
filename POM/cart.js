export class CartPage {
    constructor(page) {
        this.page = page;

        // Login Locators
        this.emailInput = '#email-input';
        this.passwordInput = '#password-input';
        this.loginButton = '#login-button';

        // Navigation URLs
        this.loginUrl = 'https://dine-dash--ramyarayala70.replit.app/login';
        this.menuUrl = 'https://dine-dash--ramyarayala70.replit.app/menu';
        this.cartUrl = 'https://dine-dash--ramyarayala70.replit.app/cart';

        // Cart / Menu Locators
        this.addToCartBtn = (id) => `[data-test="add-to-cart-${id}"]`;
        this.cartCount = '[data-test="nav-cart-link"] span';
        this.cartItemText = 'Margherita Pizza';
        this.quantity = 'span.w-6';
        this.increaseBtn = (id) => `[data-test="qty-increase-${id}"]`;
        this.decreaseBtn = (id) => `[data-test="qty-decrease-${id}"]`;
        this.removeBtn = (id) => `[data-test="remove-from-cart-${id}"]`;
        this.price = '.font-bold.text-primary';
        this.emptyCartText = 'text=Your cart is empty';
        this.toastMessage = 'div.text-sm.font-semibold';
    }

    // Actions
    async login(email, password) {
        await this.page.goto(this.loginUrl);
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async goToMenu() {
        await this.page.goto(this.menuUrl);
    }

    async goToCart() {
        await this.page.goto(this.cartUrl);
    }

    async addToCart(id) {
        await this.page.click(this.addToCartBtn(id));
    }

    async increaseQuantity(id) {
        await this.page.click(this.increaseBtn(id));
    }

    async decreaseQuantity(id) {
        await this.page.click(this.decreaseBtn(id));
    }

    async removeItem(id) {
        await this.page.click(this.removeBtn(id));
    }

    async getCartCount() {
        return Number(await this.page.locator(this.cartCount).first().textContent());
    }

    async getQuantity() {
        return Number(await this.page.locator(this.quantity).textContent());
    }

    async getPrice() {
        return await this.page.locator(this.price).first().textContent();
    }
}