import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";

import { GradeCourse } from "@/interfaces/Course";
import { useConfirmStartCourse } from "@/hooks/useConfirmStartCourse.hook";

type Props = {
  openConfirmStartCourse: GradeCourse | undefined;
  onCloseConfirmStartCourse: () => void;
  gradeId: string;
  startNewCourseHandler: (
    courseId: string,
    gradeId: string,
    startDate: string,
    professor: string,
  ) => Promise<void>;
};

const ModalStartCourse = (props: Props) => {
  const {
    startDate,
    professorName,
    onConfirmStartCourseHandler,
    onUpdateInput,
    onUpdateInputDate,
    isLoading,
  } = useConfirmStartCourse(
    props.openConfirmStartCourse as GradeCourse,
    props.onCloseConfirmStartCourse,
    props.startNewCourseHandler,
    props.gradeId,
  );

  return (
    <Modal
      isOpen={!!props.openConfirmStartCourse}
      onOpenChange={props.onCloseConfirmStartCourse}
    >
      <ModalContent>
        <ModalHeader>Start Course</ModalHeader>
        <ModalBody>
          <p>You are about to start {props.openConfirmStartCourse?.name}. </p>
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            granularity="day"
            label={"Start Date"}
            name="startDate"
            value={startDate}
            onChange={onUpdateInputDate}
          />
          <Input
            label="Professor Name"
            name="professor"
            value={professorName}
            onChange={onUpdateInput}
          />
        </ModalBody>
        <ModalFooter className="justify-end flex flex-row align-end">
          <Button
            color="danger"
            variant="light"
            onPress={props.onCloseConfirmStartCourse}
          >
            Cancel
          </Button>
          <Button
            className="mr-auto"
            color="primary"
            disabled={isLoading}
            variant="flat"
            onPress={onConfirmStartCourseHandler}
          >
            Initialize Course
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalStartCourse;
