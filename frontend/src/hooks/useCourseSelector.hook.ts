import { useEffect, useState } from "react";

import { ICourseService } from "@/services/CoursesService/CourseService.service";
import { Course } from "@/interfaces/Course";

export type ModalType = "add" | "create";
export const useCourseSelector = (courseService: ICourseService) => {
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

  useEffect(onInit, []);

  return {
    openModal,
    closeModal,
    isOpenModal,
    modalType,
    changeModalType,
    courses,
  };
};
