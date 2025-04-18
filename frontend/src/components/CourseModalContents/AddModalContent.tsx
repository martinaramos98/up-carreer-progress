import { Button } from "@heroui/button";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import CourseListbox from "../CourseListbox/CourseListbox";

import { Course } from "@/interfaces/Course";
import { useCourseSelect } from "@/hooks/useCorrelativesSelector.hook";
import { ModalType } from "@/hooks/useCourseSelector.hook";

type Props = {
  changeModalType: (modalType: ModalType) => void;
  addCourses: (courses: Course[]) => void;
  courses: Course[];
};

const AddModalContent = (props: Props) => {
  const {
    availableCorrelativesToSelect,
    correlativesSelected,
    onSelectCorrelative,
    onRemoveCourse,
  } = useCourseSelect(props.courses);

  return (
    <>
      <ModalHeader className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Add Courses</h1>
        <p className="text-sm text-gray-500">Add a course to your grade</p>
      </ModalHeader>
      <ModalBody>
        <Autocomplete
          label="Available Courses"
          placeholder="Select a course"
          onSelectionChange={onSelectCorrelative}
        >
          {availableCorrelativesToSelect.map((course) => (
            <AutocompleteItem key={course.id} description={course.description}>
              {course.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <CourseListbox
          courses={correlativesSelected}
          onRemoveCourse={onRemoveCourse}
        />
        <div>
          <span className="text-xs">Needs to create?</span>{" "}
          <Button
            className="p-1"
            color="primary"
            size="sm"
            variant="light"
            onPress={() => props.changeModalType("create")}
          >
            Change to create course
          </Button>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="light">Cancel</Button>
        <Button
          color="success"
          variant="flat"
          onPress={() => props.addCourses(correlativesSelected)}
        >
          Confirm Add
        </Button>
      </ModalFooter>
    </>
  );
};

export default AddModalContent;
