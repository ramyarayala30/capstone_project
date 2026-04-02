import { test, expect } from '@playwright/test';
import { OrderSummaryPage } from '../POM/orderSummary';

let orderPage;

test.describe('Order Summary Module (POM)', () => {

    test.beforeEach(async ({ page }) => {
        orderPage = new OrderSummaryPage(page);

        await orderPage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await orderPage.setupCart();
        await expect(page).toHaveURL(/cart/);
    });

    // TC01
    test('Order Summary Visible', async ({ page }) => {
        await expect(page.locator(orderPage.orderSummaryTitle)).toBeVisible();
    });

    // TC02
    test('Subtotal Section', async ({ page }) => {
        await expect(page.locator(orderPage.subtotalText)).toBeVisible();
    });

    // TC03
    test('Item Count Display', async ({ page }) => {
        await expect(page.locator(orderPage.itemsText)).toBeVisible();
    });

    // TC04
    test('Subtotal Price Visible', async ({ page }) => {
        await expect(page.locator(orderPage.price).first()).toBeVisible();
    });

    // TC05
    test('Delivery Fee Visible', async ({ page }) => {
        await expect(page.locator(orderPage.deliveryFeeText)).toBeVisible();
    });

    // TC06
    test('Delivery Fee Amount', async ({ page }) => {
        await expect(page.locator(orderPage.deliveryFeeAmount)).toBeVisible();
    });

    // TC07
    test('Total Section', async ({ page }) => {
        await expect(page.locator(orderPage.totalText).first()).toBeVisible();
    });

    // TC08
    test('Total Price Visible', async ({ page }) => {
        await expect(page.locator(orderPage.totalPrice)).toBeVisible();
    });

    // TC09
    test('Total Calculation Data Present', async ({ page }) => {
        const subtotal = await orderPage.getSubtotal();
        const delivery = await orderPage.getDeliveryFee();

        expect(subtotal).not.toBeNull();
        expect(delivery).not.toBeNull();
    });

    // TC10
    test('Truck Icon Visible', async ({ page }) => {
        await expect(page.locator(orderPage.truckIcon)).toBeVisible();
    });

    // TC11
    test('Delivery Message Visible', async ({ page }) => {
        await expect(page.locator(orderPage.deliveryMessage).first()).toBeVisible();
    });

    // TC12
    test('Place Order Button Visible', async ({ page }) => {
        await expect(page.locator(orderPage.placeOrderBtn)).toBeVisible();
    });

    // TC13
    test('Place Order Button Enabled', async ({ page }) => {
        await expect(page.locator(orderPage.placeOrderBtn)).toBeEnabled();
    });

    // TC14
    test('Place Order Click', async ({ page }) => {
        await orderPage.placeOrder();
    });

    // TC15
    test('Order Summary Loads', async ({ page }) => {
        await expect(page.locator(orderPage.orderSummaryTitle)).toBeAttached();
    });

    // TC16
    test('Footer Visible', async ({ page }) => {
        await expect(page.locator(orderPage.footer)).toBeVisible();
    });

    // TC17
    test('Notification Region Visible', async ({ page }) => {
        await expect(page.locator(orderPage.notification)).toBeAttached();
    });

    // TC18
    test('Footer After Scroll', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.locator(orderPage.footer)).toBeVisible();
    });

    // TC19
    test('Notification Position', async ({ page }) => {
        const box = await orderPage.getNotificationBox();
        expect(box.y).toBeLessThan(1000);
    });

});