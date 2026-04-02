import { test, expect } from '@playwright/test';
import { MenuPage } from '../POM/Menu';

let menuPage;

test.describe('Menu Module (POM)', () => {

    test.beforeEach(async ({ page }) => {
        menuPage = new MenuPage(page);
        await menuPage.gotoMenu();
    });

    // TC01
    test('Verify URL', async ({ page }) => {
        await expect(page).toHaveURL(/menu/);
    });

    // TC02
    test('Food items visible', async ({ page }) => {
        await expect(page.locator(menuPage.foodItems).first()).toBeVisible();
    });

    // TC03
    test('Pizza image visible', async ({ page }) => {
        await expect(page.locator(menuPage.menuImage(1))).toBeVisible();
    });

    // TC04
    test('Hover effect', async ({ page }) => {
        await menuPage.hoverItem(1);
    });

    // TC05
    test('Price format validation', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const prices = await menuPage.getAllPrices();

        for (const price of prices) {
            expect(price).toMatch(/\$\d+\.\d{2}/);
        }
    });

    // TC06
    test('Search box visible', async ({ page }) => {
        await expect(page.locator(menuPage.searchInput)).toBeVisible();
    });

    // TC07
    test('Placeholder visible', async ({ page }) => {
        await expect(page.getByPlaceholder('Search food...')).toBeVisible();
    });

    // TC08
    test('Search value', async ({ page }) => {
        await menuPage.search('Margherita Pizza');
        await expect(page.locator(menuPage.searchInput))
            .toHaveValue('Margherita Pizza');
    });

    // TC09
    test('Partial match search', async ({ page }) => {
        await menuPage.search('Margh');
        await expect(page.locator('text=Margherita')).toBeVisible();
    });

    // TC10
    test('Special characters search', async ({ page }) => {
        await page.waitForLoadState('networkidle');
        await menuPage.search('@@@');

        const items = page.locator('.card');
        await expect(items).toHaveCount(0);
    });

    // TC11
    test('Add to cart button visible', async ({ page }) => {
        await expect(page.locator(menuPage.addToCartBtn(1))).toBeVisible();
    });

    // TC12
    test('Menu image visible', async ({ page }) => {
        await expect(page.locator(menuPage.menuImage(1))).toBeVisible();
    });

    // TC13
    test('Menu description visible', async ({ page }) => {
        await expect(page.locator(menuPage.description(1))).toBeVisible();
    });

    // TC14
    test('Description contains text', async ({ page }) => {
        await expect(page.locator(menuPage.description(1)))
            .toContainText('tomato sauce');
    });

    // TC15
    test('Click Add to Cart (without login)', async ({ page }) => {
        await menuPage.addToCart(1);

        await expect(page.locator(menuPage.toastMessage))
            .toHaveText('Please login to add items to cart');
    });

    // TC16
    test('Add to cart after login', async ({ page }) => {
        await menuPage.login('ramyarayala@gmail.com', '123456');
        await expect(page).not.toHaveURL(/login/);

        await menuPage.gotoMenu();
        await menuPage.addToCart(1);

        await expect(page.locator(menuPage.toastMessage))
            .toHaveText('Added to cart');
    });

});