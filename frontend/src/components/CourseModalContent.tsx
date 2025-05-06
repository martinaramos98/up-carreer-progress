import { ModalContent } from "@heroui/modal";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";

import AddModalContent from "./CourseModalContents/AddModalContent";
import CreateModalContent from "./CourseModalContents/CreateModalContent";

import { ModalType } from "@/hooks/useCourseSelector.hook";
import { Course, NewCourse } from "@/interfaces/Course";
type Props = {
  modalType: ModalType;
  changeModalType: (modalType: ModalType) => void;
  addCourses: (courses: Course[]) => void;
  courses: Course[] | undefined;
  createCourse: (course: NewCourse) => void;
};
const CourseModalContent = (props: Props) => {
  return (
    <ModalContent>
      {typeof props.courses === "undefined" && (
        <Card>
          <CardBody>
            <Spinner
              classNames={{ label: "text-foreground mt-4" }}
              label="Loading Courses"
              variant="simple"
            />
          </CardBody>
        </Card>
      )}
      {props.modalType === "add" && (
        <AddModalContent
          addCourses={props.addCourses}
          changeModalType={props.changeModalType}
          courses={props.courses ?? []}
        />
      )}
      {props.modalType === "create" && (
        <CreateModalContent
          courses={props.courses ?? []}
          createCourse={props.createCourse}
        />
      )}
    </ModalContent>
  );
};

export default CourseModalContent;
