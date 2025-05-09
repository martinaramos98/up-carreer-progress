import { Axios } from "axios";
import { addToast } from "@heroui/toast";

import {
  Course,
  CourseWithCorrelatives,
  GradeCourse,
  GradeCourseStatus,
  NewCourse,
  TakedCourse,
} from "@/interfaces/Course";
import { IResult } from "@/utils/rest.util";
import { convertCourseToTreeCourse } from "@/utils/recursive.util";
export interface ICourseService {
  getCourses: () => Promise<IResult<Course[] | unknown>>;
  getCourse: (id: string) => Promise<IResult<Course | unknown>>;
  createCourse: (course: NewCourse) => Promise<IResult<Course | unknown>>;
  updateCourse: (course: Course) => Promise<IResult<TakedCourse | unknown>>;
  deleteCourse: (id: string) => Promise<IResult<unknown>>;
  startNewCourse: (
    courseId: string,
    carreerId: string,
    startDate: string,
    professor: string,
  ) => Promise<IResult<TakedCourse | unknown>>;
  changeStatusCourse: (
    courseId: string,
    gradeId: string,
    startDate: string,
    newStatus: GradeCourseStatus,
  ) => Promise<IResult<GradeCourse | unknown>>;
}

export function useCourseService(restAgent: Axios): ICourseService {
  const getCourses = async (): Promise<IResult<Course[] | unknown>> => {
    try {
      const { data } =
        await restAgent.get<CourseWithCorrelatives[]>("/courses");
      const courses: Course[] = [];

      convertCourseToTreeCourse(data, courses);

      return {
        data: courses,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error getting courses",
        description: "An error occurred while getting courses.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error.data,
      };
    }
  };
  const getCourse = async (id: string): Promise<IResult<Course | unknown>> => {
    try {
      const { data } = await restAgent.get<Course>(`/courses/${id}`);

      return {
        data,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        data: error,
      };
    }
  };
  const createCourse = async (
    course: NewCourse,
  ): Promise<IResult<Course | unknown>> => {
    try {
      const { data } = await restAgent.post<Course>("/courses", course);

      return {
        data,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error creating course",
        description: "An error occurred while creating the course.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error,
      };
    }
  };
  const updateCourse = async (
    course: Course,
  ): Promise<IResult<Course | unknown>> => {
    try {
      const { data } = await restAgent.put<Course>(
        `/courses/${course.id}`,
        course,
      );

      return {
        data,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error updating course",
        description: "An error occurred while getting courses.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error,
      };
    }
  };
  const deleteCourse = async (id: string): Promise<IResult<unknown>> => {
    try {
      const { data } = await restAgent.delete<Course>(`/courses/${id}`);

      return {
        data,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error deleting course",
        description: "An error occurred while removing course.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error,
      };
    }
  };

  const startNewCourse = async (
    courseId: string,
    carreerId: string,
    startDate: string,
    professor: string,
  ) => {
    try {
      const { data } = await restAgent.post<Course>(
        `/courses/${courseId}/${carreerId}/start`,
        { startDate, professor },
      );

      addToast({
        title: "Course started",
        description: "The course has been started successfully.",
        hideIcon: true,
        timeout: 5000,
        color: "success",
      });

      return {
        data,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error starting course",
        description: "An error occurred while starting the course.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error,
      };
    }
  };

  const changeStatusCourse = async (
    courseId: string,
    gradeId: string,
    startDate: string,
    newStatus: GradeCourseStatus,
  ) => {
    try {
      const { data } = await restAgent.put<Course>(
        `/courses/${courseId}/${gradeId}/status`,
        { status: newStatus, startDate },
      );

      return {
        data,
        error: false,
      };
    } catch (error) {
      addToast({
        title: "Error updating course",
        description: "An error occurred while updating status of taked course.",
        hideIcon: true,
        timeout: 5000,
        color: "danger",
      });

      return {
        error: true,
        data: error,
      };
    }
  };

  return {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    changeStatusCourse,
    startNewCourse,
  };
}
