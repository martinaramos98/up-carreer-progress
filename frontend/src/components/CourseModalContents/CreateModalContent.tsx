import { Input } from "@heroui/input";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

import CorrelativeSelector from "../CorrelativesSelector/CorrelativeSelector";

import { useCreateCourse } from "@/hooks/useCreateCourse.hook";
import { Course, NewCourse } from "@/interfaces/Course";

type Props = {
  courses: Course[];
  createCourse: (course: NewCourse) => void;
};

const CreateModalContent = (props: Props) => {
  const {
    correlativesSelected,
    availableCorrelativesToSelect,
    onSelectCorrelative,
    onRemoveCourse,
    onChageInputDataForm,
    onCreateCourseHandler,
    onSelectPeriodHandler,
  } = useCreateCourse(props.courses, props.createCourse);

  return (
    <>
      <ModalHeader>
        <h2 className="text-2xl font-semibold">Create Course</h2>
      </ModalHeader>
      <ModalBody>
        <Input
          isRequired
          label="Course Name"
          name="name"
          placeholder="Enter course name"
          type="text"
          onChange={onChageInputDataForm}
        />
        <Input
          label="Description"
          name="description"
          placeholder="Enter course description"
          type="text"
          onChange={onChageInputDataForm}
        />
        <Input
          label="Year"
          name="year"
          placeholder="Enter year when the course should be taken"
          type="number"
          onChange={onChageInputDataForm}
        />
        <Select label="Period" onSelectionChange={onSelectPeriodHandler}>
          <SelectItem key="1">Cuatrimestral</SelectItem>
          <SelectItem key="2">Anual</SelectItem>
        </Select>
        <div>
          <h4 className="text-lg font-semibold mb-2">
            Select correlatives of Course
          </h4>
          <CorrelativeSelector
            courses={availableCorrelativesToSelect}
            onSelectCorrelative={onSelectCorrelative}
          />
          <div className="my-2 gap-2 flex flex-row flex-wrap">
            {correlativesSelected.map((correlative) => (
              <Chip
                key={correlative.id}
                onClose={() => {
                  onRemoveCourse(correlative);
                }}
              >
                {correlative.name}
              </Chip>
            ))}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="light">Cancel</Button>
        <Button color="success" variant="flat" onPress={onCreateCourseHandler}>
          Create Course
        </Button>
      </ModalFooter>
    </>
  );
};

export default CreateModalContent;
