import express from 'express';
import { type CoursesController } from "../Controllers/Courses.controller.ts";

const router = express.Router();
router.get('/',)
export function coursesRoutes(coursesController:CoursesController){
  router.get('/', coursesController.getCourses.bind(coursesController));
  router.get('/:id', coursesController.getCourseData.bind(coursesController));
  router.post('/', coursesController.addNewCourse.bind(coursesController));
  return router;

}
