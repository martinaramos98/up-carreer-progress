import { ModalContent } from "@heroui/modal";

import AddModalContent from "./CourseModalContents/AddModalContent";
import CreateModalContent from "./CourseModalContents/CreateModalContent";

import { ModalType } from "@/hooks/useCourseSelector.hook";
import { Course, NewCourse } from "@/interfaces/Course";

type Props = {
  modalType: ModalType;
  changeModalType: (modalType: ModalType) => void;
  addCourses: (courses: Course[]) => void;
  courses: Course[];
  createCourse: (course: NewCourse) => void;
};
const CourseModalContent = (props: Props) => {
  return (
    <ModalContent>
      {props.modalType === "add" && (
        <AddModalContent
          addCourses={props.addCourses}
          changeModalType={props.changeModalType}
          courses={props.courses}
        />
      )}
      {props.modalType === "create" && (
        <CreateModalContent course={props.courses} />
      )}
    </ModalContent>
  );
};

export default CourseModalContent;
