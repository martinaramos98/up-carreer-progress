import { Listbox, ListboxItem } from "@heroui/listbox";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";

import { Course } from "@/interfaces/Course";

type Props = {
  onRemoveCourse: (courseId: Course) => void;
  courses: Course[];
};

const CourseListbox = (props: Props) => {
  return (
    <Listbox hideEmptyContent variant="bordered">
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
    </Listbox>
  );
};

export default CourseListbox;
