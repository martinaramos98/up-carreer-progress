import { test, expect, } from '@playwright/test';

test.describe('Courses API', () => {

  test("GET /courses Empty", async ({ request }) => {
    const result = await request.get("/courses");
    expect(result.ok()).toBeTruthy();
    const data = await result.json();
    expect(data).toBeInstanceOf(Array);
  });

  test("GET /courses with Elements", async ({ request }) => {
    const result = await request.get("/courses");
    expect(result.ok()).toBeTruthy();
    const data = await result.json();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(4);
  });

  // test("GET /courses/:id", async ({ request }) => {});

  // test("PUT /courses/:id", async ({ request }) => {
  // })
  // test("DELETE /courses/:id", async ({ request }) => {
  // });


})