import { test, expect, } from '@playwright/test';
import { newCourse } from "../fixtures/courses.ts";

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

  test("GET /courses/:id", async ({ request }) => {
    const result = await request.get("/courses/0");
    expect(result.ok()).toBeTruthy();
    const data = await result.json();
    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(1);
    const course = data[0];
    expect(course).toHaveProperty("id", "0");
  });

  // test("PUT /courses/:id", async ({ request }) => {
  //   const updatedCourse = {
  //     name: "Algebra 1",
  //     description: "Matrices",
  //     year: 2023,
  //     id: "0",
  //     period: "0",
  //   };
  
  //   const result = await request.put("/courses/0", {
  //     data: updatedCourse,
  //   });
  
  //   expect(result.ok()).toBeTruthy();
  //   const data = await result.json();
  
  //   expect(data).toHaveProperty("id", "0");
  // })

test("POST /courses", async ({ request }) => {
  const result = await request.post("/courses", {
    data: newCourse,
  });

  const contentType = result.headers()['content-type'];
  console.log("Content-Type:", contentType);
  const text = await result.text();
  console.log("Response body:", text);

  expect(result.ok()).toBeTruthy();
});



  // test("DELETE /courses/:id", async ({ request }) => {
  // });


})