import { test, expect } from '@playwright/test';
import { HomePage } from '../POM/Home';

let homePage;

test.describe('Home Page (POM)', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.gotoHome();
    });

    // TC01
    test('Verify Home link active state', async ({ page }) => {
        await expect(page.locator(homePage.homeLink))
            .toHaveClass(/text-primary/);
    });

    // TC02
    test('Verify Menu Navigation', async ({ page }) => {
        await homePage.clickMenu();
        await expect(page).toHaveURL(/menu/);
    });

    // TC03
    test('Verify Orders Navigation', async ({ page }) => {
        await homePage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await homePage.clickOrders();
        await expect(page).toHaveURL(/orders/);
    });

    // TC04
    test('Verify Cart Navigation', async ({ page }) => {
        await homePage.login('ramyarayala@gmail.com', '123456');

        await homePage.clickCart();
        await expect(page).toHaveURL(/cart/);
    });

    // TC05
    test('Verify Logout Button Visible', async ({ page }) => {
        await homePage.login('ramyarayala@gmail.com', '123456');

        await homePage.clickCart();

        await expect(page.locator(homePage.logoutButton))
            .toBeVisible();
    });

    // TC06
    test.skip('Verify Logout Functionality', async ({ page }) => {
        await homePage.login('ramyarayala@gmail.com', '123456');

        await homePage.clickCart();
        await homePage.clickLogout();

        await expect(page).toHaveURL(/login/);
    });

    // TC07
    test('Verify Navbar Visible', async ({ page }) => {
        await expect(page.locator(homePage.navbar)).toBeVisible();
    });

    // TC08
    test('Verify Logo Navigation', async ({ page }) => {
        await expect(page.locator(homePage.logo).first()).toBeVisible();

        await homePage.clickLogo();

        await expect(page).toHaveURL(/replit.app\/?$/);
    });

    // TC09
    test('Verify Navigation Links Count', async ({ page }) => {
        await expect(page.locator(homePage.navLinks)).toHaveCount(5);
    });

});