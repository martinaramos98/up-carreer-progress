/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Handle, Position } from "@xyflow/react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

import { GradeCourse } from "@/interfaces/Course";

type Props = {
  data: {
    course: GradeCourse;
    onOpenDetailCourse: (courseId: string) => void;
    onOpenConfirmStart: (course: GradeCourse) => void;
  };
};

const colorsStatusMap = {
  completed: "success",
  "pending correlatives": "warning",
  "exam pending": "warning",
  "in progress": "primary",
};

const CourseNode = (props: Props) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={() => props.data.onOpenDetailCourse(props.data.course.id)}>
      {props.data.course.correlatives.length > 0 && (
        <Handle
          id={props.data.course.id + " target"}
          isConnectable={true}
          position={Position.Top}
          type="target"
        />
      )}

      <Card className="bg-gray-200/80 dark:bg-gray-900/80 rounded-2xl p-3 min-w-[200px] text-gray-900 dark:text-gray-200">
        <CardHeader className="p-1 gap-2">
          <span className="text-lg px-2 font-semibold">
            {props.data.course.name}
          </span>
          <Chip
            className="capitalize"
            color={colorsStatusMap[props.data.course.status] ?? "default"}
            size="sm"
            variant="flat"
          >
            {props.data.course.status}
          </Chip>
        </CardHeader>
        <CardBody className="flex flex-col p-1" />
        <CardFooter className="justify-around p-1 gap-2">
          <Button
            className="mr-auto dark:text-gray-200 hover:dark:bg-gray-800"
            size="sm"
            variant="light"
            onPress={() => props.data.onOpenDetailCourse(props.data.course.id)}
          >
            See Detail
          </Button>
          {props.data.course.status === "not started" && (
            <Button
              className="font-semibold"
              color="primary"
              size="sm"
              variant="flat"
              onPress={() => props.data.onOpenConfirmStart(props.data.course)}
            >
              Start Course
            </Button>
          )}
        </CardFooter>
      </Card>
      <Handle
        id={props.data.course.id + " source"}
        isConnectable={props.data.course.correlatives.length > 0}
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};

export default CourseNode;
