import { useState, useEffect } from "react";

import {
  GradeCourse,
  GradeCourseStatus,
  TakedCourse,
} from "@/interfaces/Course";
import { ICourseService } from "@/services/CoursesService/CourseService.service";

export function useGradeCourses(
  courseService: ICourseService,
  initialGradeCourses: GradeCourse[] | undefined,
) {
  const [gradeCourses, setGradeCourses] = useState<GradeCourse[] | null>(null);
  const startNewCourse = async (
    courseId: string,
    gradeId: string,
    startDate: string,
    professor: string,
  ) => {
    try {
      const course = await courseService.startNewCourse(
        courseId,
        gradeId,
        startDate,
        professor,
      );
      const newTakedCourse = course.data as TakedCourse;

      setGradeCourses((prevCourses) => {
        const course = prevCourses?.find((course) => course.id === courseId);

        if (!course) throw new Error("Course not found on previous state");
        course.status = "in progress";
        course.takedCourses.push({
          ...newTakedCourse,
          startDate: new Date(startDate),
        });

        return [...prevCourses!];
      });
    } catch (error) {
      console.error("Error starting new course:", error);
    }
  };

  const updateCourseStatus = async (
    courseId: string,
    gradeId: string,
    startDate: string,
    status: GradeCourseStatus,
  ) => {
    const result = await courseService.changeStatusCourse(
      courseId,
      gradeId,
      startDate,
      status,
    );

    setGradeCourses((prevCourses) => {
      const course = prevCourses?.find((course) => course.id === courseId);

      if (!course) throw new Error("Course not found on previous state");
      course.status = "in progress";
      const takedCourse = course.takedCourses.find(
        (takedCourse) =>
          takedCourse.startDate.toISOString() ===
          new Date(startDate).toISOString(),
      );

      if (!takedCourse)
        throw new Error("Taked course not found on previous state");
      takedCourse.status = status;
      course.status = status;

      return [...(prevCourses as GradeCourse[])];
    });
  };

  useEffect(() => {
    if (initialGradeCourses && !gradeCourses) {
      setGradeCourses(initialGradeCourses);
    }
  }, [initialGradeCourses]);

  return {
    startNewCourse,
    gradeCourses,
    updateCourseStatus,
  };
}
