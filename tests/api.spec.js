import { test, expect } from '@playwright/test';

test('Verify Menu API returns menu items', async ({ request }) => {
  const response = await request.get(
    'https://dine-dash--ramyarayala70.replit.app/api/menu'
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toBeTruthy();

});

test('Verify Menu Item Fields', async ({ request }) => {

  const response = await request.get(
    'https://dine-dash--ramyarayala70.replit.app/api/menu'
  );

  const data = await response.json();

  expect(data[0]).toHaveProperty('id');
  expect(data[0]).toHaveProperty('name');
  expect(data[0]).toHaveProperty('price');

});
test('Verify Menu API Response Time', async ({ request }) => {

  const start = Date.now();

  await request.get(
    'https://dine-dash--ramyarayala70.replit.app/api/menu'
  );
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(2000);
});
test('TC01 - Get cart without token', async ({ request }) => {
  const res = await request.get(`https://dine-dash--ramyarayala70.replit.app/api/cart`);

  expect(res.status()).toBe(401);
});
test('TC02 - Add item to cart', async ({ request }) => {

  const token = 'YOUR_INVALID_TOKEN';

  const res = await request.get(`https://dine-dash--ramyarayala70.replit.app/api/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      foodId: 1,
      quantity: 2
    }
  });
  expect(res.status()).toBe(400);
});
test('TC03 - Add to cart without token', async ({ request }) => {
 const res = await request.get(`https://dine-dash--ramyarayala70.replit.app/api/cart`, {
    data: {
      foodId: 1,
      quantity: 1
    }
  });

  expect(res.status()).toBe(400);
});

