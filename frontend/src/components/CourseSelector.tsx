import { Modal } from "@heroui/modal";

import CourseModalContent from "./CourseModalContent";
import CourseListbox from "./CourseListbox/CourseListbox";

import { useCourseSelector } from "@/hooks/useCourseSelector.hook";
import { ModalType } from "@/hooks/useCourseSelector.hook";
import { Course, NewCourse } from "@/interfaces/Course";

type Props = {
  addCourses: (courses: Course[]) => void;
  selectedCourses: Course[];
  createNewCourse: (course: NewCourse) => void;
};

const coursesMock: Course[] = [
  {
    id: "1",
    name: "Analisis 1",
    description: "Analisis de funciones, derivadas e integrales",
    correlatives: [],
    year: 1,
    period: 1,
  },
  {
    id: "2",
    name: "Algebra 1",
    description: "Algebra de matrices y sistemas de ecuaciones",
    correlatives: [],
    year: 1,
    period: 1,
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
      <CourseListbox
        courses={props.selectedCourses}
        handleAddCourse={handleAddCourse}
        handleCreateCourse={handleCreateCourse}
        onRemoveCourse={() => {}}
      />
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
