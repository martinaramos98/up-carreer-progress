import { Listbox, ListboxItem } from "@heroui/listbox";
import { Modal } from "@heroui/modal";

import CourseModalContent from "./CourseModalContent";

import { useCourseSelector } from "@/hooks/useCourseSelector.hook";
import { ModalType } from "@/hooks/useCourseSelector.hook";
import { Course } from "@/interfaces/Course";

type Props = {
  addCourses: (courses: Course[]) => void;
};

const coursesMock: Course[] = [
  {
    id: "1",
    name: "Analisis 1",
    description: "Analisis de funciones, derivadas e integrales",
    correlatives: [],
  },
  {
    id: "2",
    name: "Algebra 1",
    description: "Algebra de matrices y sistemas de ecuaciones",
    correlatives: [],
  },
];
const CourseSelector = (props: Props) => {
  const { modalType, openModal, closeModal, isOpenModal, changeModalType } =
    useCourseSelector();

  function handleAddCourse() {
    openModal("add");
  }
  function handleCreateCourse() {
    openModal("create");
  }

  return (
    <>
      <Listbox selectionMode="none" variant="flat">
        <ListboxItem
          description={"Adds a Course to your grade"}
          onPress={handleAddCourse}
        >
          Add Courses
        </ListboxItem>
        <ListboxItem
          description={"Creates a new course on the system"}
          onPress={handleCreateCourse}
        >
          New Course
        </ListboxItem>
      </Listbox>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <CourseModalContent
          addCourses={props.addCourses}
          changeModalType={changeModalType}
          courses={coursesMock}
          modalType={modalType as ModalType}
        />
      </Modal>
    </>
  );
};

export default CourseSelector;
