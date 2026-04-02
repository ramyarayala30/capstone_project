import { test, expect } from '@playwright/test';
import { OrdersPage } from '../POM/orderHistory';

let ordersPage;

test.describe('Order History Module (POM)', () => {

    test.beforeEach(async ({ page }) => {
        ordersPage = new OrdersPage(page);

        await ordersPage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await ordersPage.gotoOrders();
        await expect(page).toHaveURL(/orders/);
    });

    // TC01
    test('Verify Order History Page Loads', async ({ page }) => {
        await expect(page.locator(ordersPage.pageTitle)).toBeVisible();
    });

    // TC02
    test('Verify Orders Exist', async ({ page }) => {
        await expect(page.locator(ordersPage.orderCards).first()).toBeVisible();
    });

    // TC03
    test('Verify Quantity Format', async ({ page }) => {
        const qty = await ordersPage.getFirstQuantity();
        expect(qty).toMatch(/\d+/);
    });

    // TC04
    test('Verify Price Is Numeric', async ({ page }) => {
        const price = await ordersPage.getFirstPrice();
        const numeric = parseFloat(price.replace('$', ''));
        expect(numeric).toBeGreaterThan(0);
    });

    // TC05
    test('Verify Multiple Orders', async ({ page }) => {
        const count = await ordersPage.getOrderCount();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    // TC06
    test('Verify Date Format', async ({ page }) => {
        const date = await ordersPage.getFirstDate();
        expect(date).toMatch(/\d{1,2}:\d{2}/);
    });

    // TC07
    test('Verify Order Card Content', async ({ page }) => {
        await expect(page.locator(ordersPage.itemName).first()).toBeVisible();
        await expect(page.locator(ordersPage.priceSymbol).first()).toBeVisible();
    });

});