// import { test, expect } from '@playwright/test';
// import { beforeEach } from 'node:test';

// test.beforeEach(async ({ page }) => {
//     await page.goto('https://dine-dash--ramyarayala70.replit.app/login');
// });

// test('Verify Login Page Loads', async ({ page }) => {
//     await expect(page).toHaveURL(/login/);
//   });

//   test('Verify Email Input Field', async ({ page }) => {
//     const email = page.locator('#email-input');
//     await expect(email).toBeVisible();
//     await expect(email).toBeEditable();
//   });

// // valid email and password
// test('testing email', async ({ page }) => {

//     await page.fill('#email-input', 'ramyarayala@gmail.com');
//     await page.fill('#password-input', '123456');
//     await page.click('#login-button');
//     await expect(page).toHaveURL(/menu|home|dashboard/);

// });

// //2.Invalid Email correct password
// test('Login with Invalid Email', async ({ page }) => {

//     await page.fill('#email-input', 'wrong@example.com');
//     await page.fill('#password-input', 'Password123');

//     await page.click('button[type="submit"]');

//     await expect(page.locator('text=Invalid email or password').first()).toBeVisible();
//   });

// //3.Invalid Pssword correct email
//  test('Testing invalid Password' ,async({page})=>
//  {
//     await page.fill('#email-input', 'ramyarayala@gmail.com');
//     await page.fill('#password-input', '987654');
//     await page.click('#login-button');
//      const errorMessage = page.locator('text=Invalid email or password').first();
//     await expect(errorMessage).toBeVisible();
//  }
// );
// //4.invalid email and invalid password

// test('TC04 - Invalid email & password', async ({ page }) => {

//   await page.fill('#email-input', 'wrong@gmail.com');
//   await page.fill('#password-input', 'wrong123');
//   await page.click('#login-button');
//  await expect(page.locator('text=Invalid').first()).toBeVisible();
// });

// //Testing invalid email format
// test(' Invalid email format', async ({ page }) => {
//   await page.fill('#email-input', 'abc');
//   await page.fill('#password-input', '123456');
//   await page.click('#login-button');
//   await expect(page.locator('text=Invalid email')).toBeVisible();
// });
//  test('Login with Empty Fields', async ({ page }) => {

//     await page.click('button[type="submit"]');

//     await expect(page.locator('form')).toBeVisible();
//   });
//   test('Password Masking Check', async ({ page }) => {

//     const password = page.locator('input[type="password"]');

//     await password.fill('Password123');

//     await expect(password).toHaveAttribute('type', 'password');
//   });

import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/login';

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

// 1. Verify Login Page Loads
test('Verify Login Page Loads', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
});

// 2. Verify Email Input Field
test('Verify Email Input Field', async ({ page }) => {
    await expect(page.locator(loginPage.emailInput)).toBeVisible();
    await expect(page.locator(loginPage.emailInput)).toBeEditable();
});

// 3. Valid Login
test('Valid Login', async ({ page }) => {
    await loginPage.login('ramyarayala@gmail.com', '123456');
    await expect(page).toHaveURL(/menu|home|dashboard/);
});

// 4. Invalid Email
test('Login with Invalid Email', async ({ page }) => {
    await loginPage.login('wrong@example.com', 'Password123');
    await expect(page.locator(loginPage.errorMessage).first()).toBeVisible();
});

// 5. Invalid Password
test('Invalid Password', async ({ page }) => {
    await loginPage.login('ramyarayala@gmail.com', '987654');
    await expect(page.locator(loginPage.errorMessage).first()).toBeVisible();
});

// 6. Invalid Email & Password
test('Invalid Email & Password', async ({ page }) => {
    await loginPage.login('wrong@gmail.com', 'wrong123');
    await expect(page.locator(loginPage.errorMessage).first()).toBeVisible();
});

// 7. Invalid Email Format
test('Invalid Email Format', async ({ page }) => {
    await loginPage.login('abc', '123456');
    await expect(page.locator(loginPage.invalidEmailText)).toBeVisible();
});

// 8. Empty Fields
test('Empty Fields Login', async ({ page }) => {
    await loginPage.clickLogin();
    await expect(page.locator(loginPage.form)).toBeVisible();
});

// 9. Password Masking
test('Password Masking Check', async ({ page }) => {
    await loginPage.enterPassword('Password123');
    const passwordField = page.locator(loginPage.passwordInput);
    await expect(passwordField).toHaveAttribute('type', 'password');
});

