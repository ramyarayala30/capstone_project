
import { test, expect } from '@playwright/test';
import { CartPage } from '../POM/cart';

let cartPage;

test.describe('Cart Module (POM)', () => {

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);

        await cartPage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await cartPage.goToMenu();
        await expect(page).toHaveURL(/menu/);
    });

    // TC01
    test('Add to cart', async ({ page }) => {
        await cartPage.addToCart(1);
        await expect(page.locator(cartPage.toastMessage)).toHaveText('Added to cart');
    });

    // TC02
    test('Verify menu URL', async ({ page }) => {
        await expect(page).toHaveURL(/menu/);
    });

    // TC03
    test('Verify cart item text', async ({ page }) => {
        await expect(page.getByText(cartPage.cartItemText)).toBeVisible();
    });

    // TC04
    test('Cart count increases', async ({ page }) => {
        const before = await cartPage.getCartCount();

        await cartPage.addToCart(1);
        await cartPage.goToCart();

        const after = await cartPage.getCartCount();
        expect(after).toBeGreaterThan(before);
    });

    // TC05
    test('Product details visible', async ({ page }) => {
        await cartPage.goToCart();
        await expect(page.locator('img')).toBeVisible();
        await expect(page.locator('h3').first()).toBeVisible();
    });

    // TC06
    test('Default quantity', async ({ page }) => {
        await cartPage.goToCart();
        const qty = await cartPage.getQuantity();
        expect(qty).toBeGreaterThanOrEqual(1);
    });

    // TC07
    test('Increase quantity', async ({ page }) => {
        await cartPage.addToCart(1);
        await cartPage.goToCart();

        const before = await cartPage.getQuantity();
        await cartPage.increaseQuantity(1);

        await expect(page.locator(cartPage.quantity))
            .toHaveText(String(before + 1));
    });

    // TC08
    test('Decrease quantity', async ({ page }) => {
        await cartPage.goToCart();

        const before = await cartPage.getQuantity();
        await cartPage.decreaseQuantity(1);

        await expect(page.locator(cartPage.quantity))
            .toHaveText(String(before - 1));
    });

    // TC09
    test('Quantity not less than 1', async ({ page }) => {
        await cartPage.goToCart();

        await cartPage.decreaseQuantity(1);
        await cartPage.decreaseQuantity(1);

        const qty = await cartPage.getQuantity();
        expect(qty).toBeGreaterThanOrEqual(1);
    });

    // TC10
    test('Price changes on increase', async ({ page }) => {
        await cartPage.goToCart();

        const priceBefore = await cartPage.getPrice();
        await cartPage.increaseQuantity(1);

        await expect(page.locator(cartPage.price))
            .not.toHaveText(priceBefore);
    });

    // TC11
    test('Price changes on decrease', async ({ page }) => {
        await cartPage.goToCart();

        let qty = await cartPage.getQuantity();
        if (qty === 1) {
            await cartPage.increaseQuantity(1);
        }

        const priceBefore = await cartPage.getPrice();
        await cartPage.decreaseQuantity(1);

        await expect(page.locator(cartPage.price))
            .not.toHaveText(priceBefore);
    });

    // TC13
    test('Remove item from cart', async ({ page }) => {
        await cartPage.goToCart();

        await cartPage.removeItem(1);
        await expect(page.locator(cartPage.emptyCartText)).toBeVisible();
    });

    // TC14
    test('Multiple rapid clicks', async ({ page }) => {
        await cartPage.addToCart(1);
        await cartPage.goToCart();

        let qty = await cartPage.getQuantity();

        for (let i = 0; i < 5; i++) {
            await cartPage.increaseQuantity(1);
            qty++;
            await expect(page.locator(cartPage.quantity))
                .toHaveText(String(qty));
        }
    });

});





