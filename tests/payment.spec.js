import { test, expect } from '@playwright/test';
import { PaymentPage } from '../POM/payment';

let paymentPage;

test.describe('Payment Module (POM)', () => {

    test.beforeEach(async ({ page }) => {
        paymentPage = new PaymentPage(page);

        await paymentPage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await paymentPage.setupCart();
        await expect(page).toHaveURL(/cart/);
    });

    // TC01
    test('Verify Payment Section Visible', async ({ page }) => {
        await expect(page.locator(paymentPage.paymentTitle)).toBeVisible();
    });

    // TC02
    test('Verify Card Option', async ({ page }) => {
        await expect(page.locator(paymentPage.cardOption)).toBeVisible();
    });

    // TC03
    test('Verify UPI Option', async ({ page }) => {
        await expect(page.locator(paymentPage.upiOption)).toBeVisible();
    });

    // TC04
    test('Verify COD Option', async ({ page }) => {
        await expect(page.locator(paymentPage.codOption)).toBeVisible();
    });

    // TC05
    test('Select Credit Card', async ({ page }) => {
        await paymentPage.selectCard();
        await expect(page.locator(paymentPage.cardOption))
            .toHaveClass(/border-primary/);
    });

    // TC06
    test('Select UPI', async ({ page }) => {
        await paymentPage.selectUPI();
        await expect(page.locator(paymentPage.upiOption))
            .toHaveClass(/border-primary/);
    });

    // TC07
    test('Select COD', async ({ page }) => {
        await paymentPage.selectCOD();
        await expect(page.locator(paymentPage.codOption))
            .toHaveClass(/border-primary/);
    });

    // TC08
    test('Only one payment method selected', async ({ page }) => {
        const card = page.locator(paymentPage.cardOption);
        const upi = page.locator(paymentPage.upiOption);

        await paymentPage.selectCard();
        await expect(card).toHaveClass(/border-primary/);

        await paymentPage.selectUPI();
        await expect(upi).toHaveClass(/border-primary/);

        await expect(card).not.toHaveClass(/bg-primary/);
    });

});