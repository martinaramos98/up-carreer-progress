import { test, expect } from '@playwright/test';

test('version get', async ({ request }) => {
  const response = await request.get("/version");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toBe("0.1.0");
});
test('get Carreras', async ({ request }) => {
  const response = await request.get("/grades");
  expect(response.ok()).toBeTruthy();
  expect(await response.json()).toEqual([]);
});