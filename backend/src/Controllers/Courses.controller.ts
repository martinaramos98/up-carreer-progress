import type { Request, Response } from "express";
import { type CoursesService } from "../Services/Courses.service.ts";

export class CoursesController {
  private coursesService: CoursesService;
  constructor(coursesService: CoursesService) {
    this.coursesService = coursesService;
  }
  async getCourses(_req: Request, res: Response) {
    try {
      const courses = await this.coursesService.getCourses();
      res.status(200).json(courses);
    } catch (_error) {
      res.status(404).json({ error: "Cannot get courses" });
    }
  }
  async getCourseData(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const course = await this.coursesService.getCourseData(courseId);
      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({
        error: "Cannot get course data",
        errorData: error,
      });
    }
  }
  async addNewCourses(req: Request, res: Response) {
    try {
      const courseData = req.body;
      const result = await this.coursesService.addNewCourses(courseData);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: "Cannot add new course",
        errorData: error,
      });
    }
  }
  async updateCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const courseData = req.body;
      const result = await this.coursesService.updateCourse(
        courseId,
        courseData,
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: "Cannot update course",
        errorData: error,
      });
    }
  }
  async deleteCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const result = await this.coursesService.deleteCourse(courseId);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: "Cannot delete course",
        errorData: error,
      });
    }
  }
  async createTakedCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      const carreerId = req.params.carreerId;
      const takedCourseData = req.body;
      const result = await this.coursesService.startNewCourse(
        {
          startDate: takedCourseData.startDate,
          professor: takedCourseData.professor,
          gradeId: carreerId,
          courseId: courseId,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: "Cannot create taked course",
        errorData: error,
      });
    }
  }
  async updateTakedCourseStatus(req: Request, res: Response) {
    try {
      const carreerId = req.params.carreerId;
      const courseId = req.params.courseId;
      const takedCourseData = req.body;
      const result = await this.coursesService.updateStatusTakedCourse(
      {
        courseId: courseId,
        gradeId: carreerId,
        startDate: takedCourseData.startDate,
        status: takedCourseData.status,
      }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({
        error: "Cannot update taked course",
        errorData: error,
      });
    }
  }

}
