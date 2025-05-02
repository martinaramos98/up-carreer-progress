import { Modal } from "@heroui/modal";

import CourseModalContent from "./CourseModalContent";
import CourseListbox from "./CourseListbox/CourseListbox";

import { useCourseSelector } from "@/hooks/useCourseSelector.hook";
import { ModalType } from "@/hooks/useCourseSelector.hook";
import { Course } from "@/interfaces/Course";
import { ICourseService } from "@/services/CoursesService/CourseService.service";

type Props = {
  addCourses: (courses: Course[]) => void;
  selectedCourses: Course[];
  courseService: ICourseService;
};

const CourseSelector = (props: Props) => {
  const {
    modalType,
    openModal,
    closeModal,
    isOpenModal,
    changeModalType,
    courses,
    createCourseHandler,
    addCoursesHandler,
  } = useCourseSelector(props.courseService, props.addCourses);

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
          addCourses={addCoursesHandler}
          changeModalType={changeModalType}
          courses={courses}
          createCourse={createCourseHandler}
          modalType={modalType as ModalType}
        />
      </Modal>
    </>
  );
};

export default CourseSelector;
