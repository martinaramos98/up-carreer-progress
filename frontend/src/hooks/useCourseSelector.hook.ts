import { useState } from "react";

export type ModalType = "add" | "create";

export const useCourseSelector = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();

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
