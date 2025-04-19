import { Listbox, ListboxItem } from "@heroui/listbox";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";

import { Course } from "@/interfaces/Course";

type Props = {
  onRemoveCourse: (courseId: Course) => void;
  courses: Course[];
  handleAddCourse?: () => void;
  handleCreateCourse?: () => void;
};

const CourseListbox = (props: Props) => {
  return (
    <Listbox hideEmptyContent selectionMode="none" variant="flat">
      <>
        {props.handleAddCourse && (
          <ListboxItem
            description={"Adds a Course to your grade"}
            onPress={props.handleAddCourse}
          >
            Add Courses
          </ListboxItem>
        )}
        {props.handleCreateCourse && (
          <ListboxItem
            description={"Creates a new course on the system"}
            onPress={props.handleCreateCourse}
          >
            New Course
          </ListboxItem>
        )}
        {props.courses.map((course) => (
          <ListboxItem
            key={course.id}
            description={course.description}
            endContent={
              <Button
                color="danger"
                size="sm"
                variant="light"
                onPress={() => {
                  props.onRemoveCourse(course);
                }}
              >
                <Trash2 height={"20px"} width={"20px"} />
              </Button>
            }
          >
            {course.name}
          </ListboxItem>
        ))}
      </>
    </Listbox>
  );
};

export default CourseListbox;
