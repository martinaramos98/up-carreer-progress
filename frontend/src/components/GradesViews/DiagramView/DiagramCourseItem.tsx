import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

import { GradeCourse } from "@/interfaces/Course";

type Props = {
  course: GradeCourse;
  onOpenDetailCourse: (courseId: string) => void;
  onOpenConfirmStart: (course: GradeCourse) => void;
};
const colorsStatusMap = {
  completed: "success",
  "pending correlatives": "warning",
  "exam pending": "warning",
  "in progress": "primary",
};
const DiagramCourseItem = (props: Props) => {
  const handleOpenDetailCourse = () => {
    props.onOpenDetailCourse(props.course.id);
  };

  return (
    <div
      key={props.course.id}
      className="bg-gray-200/80 dark:bg-zinc-800/80 rounded-2xl p-3 w-full h-[85px] flex flex-row"
    >
      <div className="flex flex-row items-start gap-2 h-fit items-center">
        <span>{props.course.name}</span>
        <Chip
          className="capitalize"
          color={colorsStatusMap[props.course.status] ?? "default"}
          size="sm"
          variant="flat"
        >
          {props.course.status}
        </Chip>
      </div>

      <div className="flex flex-col ml-auto gap-2 h-full">
        <Button
          disableRipple
          className="text-zinc-500"
          size="sm"
          variant="light"
          onPress={handleOpenDetailCourse}
        >
          Course Detail
        </Button>
        {props.course.status === "not started" && (
          <Button
            className="rounded-lg font-semibold"
            color="primary"
            variant="flat"
            onPress={() => props.onOpenConfirmStart(props.course)}
          >
            Start Course
          </Button>
        )}
      </div>
    </div>
  );
};

export default DiagramCourseItem;
