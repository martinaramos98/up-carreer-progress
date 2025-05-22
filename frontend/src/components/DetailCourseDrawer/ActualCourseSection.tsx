import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button } from "@heroui/button";

import {
  GradeCourse,
  GradeCourseStatus,
  TakedCourse,
} from "@/interfaces/Course";

type Props = {
  course: GradeCourse;
  onOpenConfirmStart?: (course: GradeCourse) => void;
  selectedCourseCanStart?: boolean;
  colorsStatusMap: Record<string, string>;
  statusOptions: Array<{ key: string; label: string }>;
  dateFormat: Intl.DateTimeFormat;
  onUpdateCourseStatus: (
    courseId: string,
    gradeId: string,
    startDate: string,
    newStatus: GradeCourseStatus,
  ) => Promise<void>;
};

export const ActualCourseSection = (props: Props) => {
  const lastCourse = props.course.takedCourses?.at(-1) as TakedCourse;
  const canStartNewCourse = props.course.takedCourses.every(
    (taked) =>
      taked.status === "abandoned" ||
      taked.status === "not started" ||
      taked.status === "reenrolled",
  );

  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-semibold mb-2">Actual Course</h3>
      {canStartNewCourse && (
        <Card>
          <CardBody className="gap-2 flex flex-row items-center">
            <p className="dark:text-gray-400 text-gray-700 text-sm ">
              {props.course.status === "pending correlatives"
                ? "You have pending correlatives that you need to start this course."
                : "This course has not been taken yet."}
            </p>
            {props.selectedCourseCanStart && (
              <Button
                className="font-semibold"
                color="primary"
                size="sm"
                variant="light"
                onPress={() => props.onOpenConfirmStart?.(props.course)}
              >
                Start Course
              </Button>
            )}
          </CardBody>
        </Card>
      )}
      {lastCourse &&
        lastCourse.status !== "completed" &&
        lastCourse.status !== "abandoned" && (
          <Card>
            <CardBody className="flex flex-row gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Started on:</span>
                {props.dateFormat.format(lastCourse.startDate)}
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Professor: </span>
                <span>{lastCourse.professor}</span>
              </div>
              <Select
                className="max-w-xs w-[120px] ml-auto"
                classNames={{
                  label: "capitalize",
                  value: "capitalize text-sm",
                }}
                color={props.colorsStatusMap[lastCourse.status]}
                items={props.statusOptions}
                radius="lg"
                selectedKeys={new Set([(lastCourse as TakedCourse).status])}
                size="sm"
                variant="flat"
                onSelectionChange={(values) => {
                  props.onUpdateCourseStatus(
                    lastCourse.course,
                    lastCourse.carreer,
                    parseAbsoluteToLocal(
                      lastCourse.startDate.toISOString(),
                    ).toAbsoluteString(),
                    values.currentKey as GradeCourseStatus,
                  );
                }}
              >
                {(item) => (
                  <SelectItem className="capitalize">{item.label}</SelectItem>
                )}
              </Select>
            </CardBody>
          </Card>
        )}
    </section>
  );
};
