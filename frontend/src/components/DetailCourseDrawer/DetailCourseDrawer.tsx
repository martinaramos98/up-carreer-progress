import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";

import { ActualCourseSection } from "./ActualCourseSection";

import { GradeCourse, GradeCourseStatus } from "@/interfaces/Course";
type Props = {
  open: boolean;
  onClose: () => void;
  course: GradeCourse;
  selectedCourseCanStart?: boolean;
  correlativesCoursesStatus?: {
    status: GradeCourseStatus;
    name: string;
    id: string;
  }[];
  onOpenConfirmStart?: (course: GradeCourse) => void;
  onUpdateCourseStatus: (
    courseId: string,
    gradeId: string,
    startDate: string,
    newStatus: GradeCourseStatus,
  ) => Promise<void>;
};

const colorsStatusMap = {
  completed: "success",
  "pending correlatives": "warning",
  "exam pending": "warning",
  "in progress": "primary",
};
const statusOptions = [
  { key: "in progress", label: "in progress" },
  { key: "completed", label: "completed" },
  { key: "exam pending", label: "exam pending" },
  { key: "abandoned", label: "abandoned" },
];
const dateFormat = new Intl.DateTimeFormat("es-AR", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const DetailCourseDrawer = (props: Props) => {
  return (
    <Drawer
      isOpen={props.open}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          },
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          },
        },
      }}
      placement="right"
      onOpenChange={props.onClose}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold flex flex-row items-end gap-2">
                {props.course.name}
                <Chip
                  className="capitalize"
                  color={colorsStatusMap[props.course.status]}
                  size="sm"
                  variant="flat"
                >
                  {props.course.status}
                </Chip>
              </h2>

              <p className="dark:text-gray-400 text-gray-700 text-sm font-normal">
                {props.course.description}
              </p>
            </DrawerHeader>
            <DrawerBody>
              <section>
                <h3 className="font-semibold mb-2">
                  Correlatives of the course
                </h3>
                <ul>
                  {props.correlativesCoursesStatus?.map((correlative) => (
                    <li key={correlative.id} className="mb-2">
                      <Card>
                        <CardBody className="flex flex-row">
                          <span>{correlative.name}</span>
                          <Chip
                            className="ml-auto capitalize"
                            color={colorsStatusMap[correlative.status]}
                            variant="flat"
                          >
                            {correlative.status}
                          </Chip>
                        </CardBody>
                      </Card>
                    </li>
                  ))}
                  {props.correlativesCoursesStatus?.length === 0 && (
                    <Card>
                      <CardBody className="flex flex-row">
                        <p className="dark:text-gray-400 text-gray-700 text-sm">
                          This course doesn{"'"}t have correlatives
                        </p>
                      </CardBody>
                    </Card>
                  )}
                </ul>
              </section>
              <ActualCourseSection
                colorsStatusMap={colorsStatusMap}
                course={props.course}
                dateFormat={dateFormat}
                selectedCourseCanStart={props.selectedCourseCanStart}
                statusOptions={statusOptions}
                onOpenConfirmStart={props.onOpenConfirmStart}
                onUpdateCourseStatus={props.onUpdateCourseStatus}
              />
              <section>
                <h3 className="font-semibold mb-2">Course History</h3>
                <ul className="flex flex-col gap-3">
                  {props.course.takedCourses?.map((takedCourse) => (
                    <li key={takedCourse.startDate + props.course.id}>
                      <Card>
                        <CardBody className="flex flex-row gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              Started on:
                            </span>
                            {dateFormat.format(takedCourse.startDate)}
                          </div>

                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              Professor:{" "}
                            </span>
                            <span>{takedCourse.professor}</span>
                          </div>
                          <Chip
                            className="ml-auto capitalize font-semibold"
                            color={colorsStatusMap[takedCourse.status]}
                            variant="flat"
                          >
                            {takedCourse.status}
                          </Chip>
                        </CardBody>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCourseDrawer;
