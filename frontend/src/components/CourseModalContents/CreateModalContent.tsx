import { Input } from "@heroui/input";
import { ModalBody, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

import CorrelativeSelector from "../CorrelativesSelector/CorrelativeSelector";

import { useCourseSelect } from "@/hooks/useCorrelativesSelector.hook";
import { Course } from "@/interfaces/Course";

type Props = {
  course: Course[];
};

const CreateModalContent = (props: Props) => {
  const {
    correlativesSelected,
    availableCorrelativesToSelect,
    onSelectCorrelative,
    onRemoveCourse,
  } = useCourseSelect(props.course);

  return (
    <>
      <ModalHeader>
        <h2 className="text-2xl font-semibold">Create Course</h2>
      </ModalHeader>
      <ModalBody>
        <Input
          isRequired
          label="Course Name"
          placeholder="Enter course name"
          type="text"
        />
        <Input
          label="Description"
          placeholder="Enter course description"
          type="text"
        />

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
        <Button color="success" variant="flat">
          Create Course
        </Button>
      </ModalFooter>
    </>
  );
};

export default CreateModalContent;
