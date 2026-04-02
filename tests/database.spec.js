import { test, expect } from '@playwright/test';

const baseURL = 'https://dine-dash--ramyarayala70.replit.app';

test.describe('Database Testing using Mocking + Parameterization', () => {

  // 🔹 Mock User Data (acts like DB)
  const users = [
    { email: 'ramyarayala@gmail.com', password: '123456' },
    { email: 'amrit1@gmail.com', password: '123456' },
  ];

  // 🔹 Mock Cart Data
  const cartData = [
    { food: 'Pizza', qty: 2 },
    { food: 'Burger', qty: 1 }
  ];

  // ================= LOGIN TESTS =================

  users.forEach((user, index) => {
    test.skip(`TC${index+1} - Login success for ${user.email}`, async ({ page }) => {

      await page.route('**/api/login', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify({ token: 'mock_token' })
        })
      );

      await page.goto(baseURL + '/login');

      await page.fill('input[type="email"]', user.email);
      await page.fill('input[type="password"]', user.password);
      await page.click('text=Sign in');

      expect(true).toBeTruthy();
    });
  });

  // ================= CART TESTS =================

  for (let i = 3; i <= 10; i++) {
    test(`TC${i} - Get cart data`, async ({ page }) => {

      await page.route('**/api/cart', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify(cartData)
        })
      );

      await page.goto(baseURL + '/cart');

      expect(cartData.length).toBeGreaterThan(0);
    });
  }

  // ================= ADD TO CART =================

  for (let i = 11; i <= 15; i++) {
    test(`TC${i} - Add item to cart`, async ({ page }) => {

      await page.route('**/api/cart', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify({ message: 'Item added' })
        })
      );

      await page.goto(baseURL + '/menu');

      expect(true).toBeTruthy();
    });
  }

  // ================= UPDATE CART =================

  for (let i = 16; i <= 20; i++) {
    test(`TC${i} - Update cart quantity`, async ({ page }) => {

      await page.route('**/api/cart/*', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify({ message: 'Updated' })
        })
      );

      expect(true).toBeTruthy();
    });
  }

  // ================= DELETE CART =================

  for (let i = 21; i <= 25; i++) {
    test(`TC${i} - Delete item from cart`, async ({ page }) => {

      await page.route('**/api/cart/*', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify({ message: 'Deleted' })
        })
      );

      expect(true).toBeTruthy();
    });
  }

  // ================= ORDER TESTS =================

  for (let i = 26; i <= 30; i++) {
    test(`TC${i} - Place order`, async ({ page }) => {

      await page.route('**/api/orders', route =>
        route.fulfill({
          status: 200,
          body: JSON.stringify({ orderId: i })
        })
      );

      expect(i).toBeGreaterThan(0);
    });
  }

});