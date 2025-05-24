import { Course } from "../../src/db/libsql/schemas/courses.ts";
import { NewCourse } from "../../src/models/courses.ts";

export const coursesTestFixture: Course[] = [{
  name: "DevOps",
  description: "CI/CD",
  year: 2023,
  id: "0",
  period: "0",
}, {
  name: "Analisis Matematico 2",
  description: "Limites e integrales",
  year: 2023,
  id: "1",
  period: "0",
}, {
  name: "Introduccion a la Ingenieria de Software",
  description: "Relleno",
  year: 2023,
  id: "2",
  period: "0",
}, {
  name: "Laboratorio 1",
  description: "Java",
  year: 2023,
  id: "3",
  period: "0",
}];

export const newCourse:NewCourse[] = [{
    name: "Quimica I",
    description: "Quimica Test 1",
    period: "1",
    correlativesCourses: [],
    year: 2023,
}]