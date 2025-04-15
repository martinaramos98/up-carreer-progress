import express from "express";
import { type CoursesController } from "../Controllers/Courses.controller.ts";

const router = express.Router();
export function coursesRoutes(coursesController: CoursesController) {
  router.get("/", coursesController.getCourses.bind(coursesController));
  router.get("/:id", coursesController.getCourseData.bind(coursesController));
  router.post("/", coursesController.addNewCourses.bind(coursesController));
  router.put("/:id", coursesController.updateCourse.bind(coursesController));
  router.delete("/:id", coursesController.deleteCourse.bind(coursesController));
  return router;
}
