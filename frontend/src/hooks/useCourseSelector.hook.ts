import { useState } from "react";

import { ICourseService } from "@/services/CoursesService/CourseService.service";

export type ModalType = "add" | "create";
export const useCourseSelector = (courseService: ICourseService) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const [courses, setCourses] = useState();

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

  return {
    openModal,
    closeModal,
    isOpenModal,
    modalType,
    changeModalType,
  };
};
