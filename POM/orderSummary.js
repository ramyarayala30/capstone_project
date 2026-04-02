export class OrderSummaryPage {
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

        // Order Summary Section
        this.orderSummaryTitle = 'text=Order Summary';
        this.subtotalText = 'text=Subtotal';
        this.itemsText = 'text=/items/';
        this.price = 'text=/\\$/';
        this.deliveryFeeText = 'text=Delivery Fee';
        this.deliveryFeeAmount = 'text=$5.00';
        this.totalText = 'text=Total';
        this.totalPrice = '.text-2xl.text-primary';

        // Delivery Info
        this.truckIcon = '.lucide-truck';
        this.deliveryMessage = '.text-muted-foreground';

        // Buttons
        this.placeOrderBtn = '[data-testid="place-order-button"]';

        // Footer & Notifications
        this.footer = 'footer';
        this.notification = '[aria-label="Notifications (F8)"]';
    }

    // Actions
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

    async placeOrder() {
        await this.page.click(this.placeOrderBtn);
    }

    // Getters
    async getSubtotal() {
        return await this.page.locator(this.price).first().textContent();
    }

    async getDeliveryFee() {
        return await this.page.locator(this.deliveryFeeAmount).textContent();
    }

    async getNotificationBox() {
        return await this.page.locator(this.notification).boundingBox();
    }
}