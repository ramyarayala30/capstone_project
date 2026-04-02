
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../POM/registration';

let registrationPage;

test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
});

// 1. Successful Registration
test('TC01 - Register with valid details', async ({ page }) => {
    await registrationPage.register('John Doe', `user${Date.now()}@test.com`, 'Password123', 'Password123');
    await expect(page).not.toHaveURL(/login/);
});

// 2. Empty Form
test('TC02 - Submit empty form', async ({ page }) => {
    await registrationPage.clickRegister();
    await expect(await registrationPage.getErrorMessage()).toBeVisible();
});

// 3. Invalid Email
test('TC03 - Invalid email format', async ({ page }) => {
    await registrationPage.enterEmail('invalid');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getErrorMessage()).toBeVisible();
});

// 4. Password Too Short
test('TC04 - Password too short', async ({ page }) => {
    await registrationPage.enterPassword('123');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getPasswordErrorMessage()).toBeVisible();
});

// 5. Password Mismatch
test('TC05 - Password mismatch', async ({ page }) => {
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterConfirmPassword('Password456');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getPasswordErrorMessage()).toBeVisible();
});

// 6. Duplicate Email
test('TC06 - Duplicate email shows error popup', async ({ page }) => {
    await registrationPage.register('Ramya', 'ramyarayala@gmail.com', 'Password123', 'Password123');
    const errorMessage = await registrationPage.getEmailAlreadyRegisteredMessage();
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
});

// 7. Empty Email
test('TC07 - Empty email field', async ({ page }) => {
    await registrationPage.enterEmail('');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getErrorMessage()).toBeVisible();
});

// 8. Empty Name
test('TC08 - Empty name field', async ({ page }) => {
    await registrationPage.enterName(' ');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getNameErrorMessage()).toBeVisible();
});

// 9. Name Max Length
test('TC09 - Verify Name Max Length', async ({ page }) => {
    await registrationPage.enterName('abcdefghijklmnopqr');
    const value = await page.locator('#name-input').inputValue();
    expect(value.length).toBeLessThanOrEqual(15);
});

// 10. Empty Password
test('TC10 - Empty password field', async ({ page }) => {
    await registrationPage.enterPassword('');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getPasswordErrorMessage()).toBeVisible();
});

// 11. Special Characters in Name
test('TC11 - Invalid name with special characters', async ({ page }) => {
    await registrationPage.enterName('@@@@');
    await registrationPage.clickRegister();
    await expect(await registrationPage.getSpecialCharErrorMessage()).toBeVisible();
});

// 12. Very Long Input
test('TC12 - Very long input values', async ({ page }) => {
    const longText = 'a'.repeat(300);
    await registrationPage.enterName(longText);
    await registrationPage.clickRegister();
    await expect(page).not.toHaveURL(/login/);
});

// 13. Trim Spaces in Name
test('TC13 - Trim spaces in Name', async ({ page }) => {
    await registrationPage.enterName('   Ramya  ');
    const value = await page.locator('#name-input').inputValue();
    expect(value.trim()).toBe('Ramya');
});

// 14. Successful Registration After Fix
test('TC14 - Successful Registration', async ({ page }) => {
    await registrationPage.register('Keerthi', `keerthi${Date.now()}@test.com`, 'Password123', 'Password123');
    await expect(page).toHaveURL(/login|menu/);
});

// 15. Submit Using Enter Key
test('TC15 - Submit Using Enter Key', async ({ page }) => {
    await registrationPage.enterName('Abhinav');
    await page.keyboard.press('Enter');
    await expect(page.locator('#name-input')).toBeVisible();
});

// 16. Multiple Click Prevention
test('TC16 - Multiple Click Prevention', async ({ page }) => {
    await registrationPage.enterName('Pandu');
    await registrationPage.enterEmail('pandu@gmail.com');
    await registrationPage.enterPassword('pandu123');
    await registrationPage.enterConfirmPassword('pandu123');
    await page.dblclick('button[type="submit"]');
    await expect(page.locator('button[type="submit"]')).toBeVisible();
});

// 17. SQL Injection Attempt
test('TC17 - SQL injection attempt', async ({ page }) => {
    await registrationPage.enterEmail("' OR 1=1 --");
    await registrationPage.clickRegister();
    await expect(await registrationPage.getErrorMessage()).toBeVisible();
});