import { Course } from "../../src/db/libsql/schemas/courses.ts";
import { NewCourse } from "../../src/models/courses.ts";

export const coursesTestFixture: Course[] = [{
  name: "Test Course",
  description: "Test Course Description",
  year: 2023,
  id: "1",
  period: "0",
}, {
  name: "Test Course 2",
  description: "Test Course Description 2",
  year: 2023,
  id: "2",
  period: "0",
}, {
  name: "Test Course 3",
  description: "Test Course Description 3",
  year: 2023,
  id: "3",
  period: "0",
}, {
  name: "Test Course 4",
  description: "Test Course Description 4",
  year: 2023,
  id: "4",
  period: "0",
}];

export const newCourse:NewCourse[] = [{
    "name": "Quimica I",
    "description": "Quimica Test 1",
    "period": "1",
    "correlativesCourses": [],
    year: 2023,
}]