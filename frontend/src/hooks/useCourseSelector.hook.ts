import { useEffect, useState } from "react";

import { ICourseService } from "@/services/CoursesService/CourseService.service";
import { Course, NewCourse } from "@/interfaces/Course";

export type ModalType = "add" | "create";
export const useCourseSelector = (
  courseService: ICourseService,
  addCourses: (courses: Course[]) => void,
) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [courses, setCourses] = useState<Course[]>();

  function openModal(modalType: ModalType) {
    setModalType(modalType);
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  function changeModalType(modalType: ModalType) {
    setModalType(modalType);
  }

  function onInit() {
    courseService.getCourses().then((response) => {
      setCourses(response.data as Course[]);
    });
  }
  function createCourseHandler(course: NewCourse) {
    courseService.createCourse(course).finally(() => {
      closeModal();
    });
  }

  function addCoursesHandler(courses: Course[]) {
    addCourses(courses);
    closeModal();
  }

  useEffect(onInit, []);

  return {
    openModal,
    closeModal,
    isOpenModal,
    modalType,
    changeModalType,
    courses,
    createCourseHandler,
    addCoursesHandler,
  };
};
