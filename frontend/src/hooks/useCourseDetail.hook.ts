import { useState } from "react";

import { GradeCourse, GradeCourseStatus } from "@/interfaces/Course";

export function useCourseDetail(courses: GradeCourse[]) {
  const coursesMap = new Map(courses.map((course) => [course.id, course]));
  const [selectedCourse, setSelectedCourse] = useState<GradeCourse | undefined>(
    undefined,
  );
  const [openConfirmStart, setOpenConfirmStart] = useState<
    GradeCourse | undefined
  >();
  const selectedCourseCanStart =
    selectedCourse?.correlatives?.every(
      (corr) => coursesMap.get(corr.id)?.status === "completed",
    ) || selectedCourse?.correlatives.length === 0;

  const correlativesCoursesStatus = selectedCourse?.correlatives?.map(
    (corr) => ({
      id: corr.id,
      name: corr.name,
      status: coursesMap.get(corr.id)?.status as GradeCourseStatus,
    }),
  );

  function onOpenConfirmStart(courseToStart: GradeCourse) {
    setOpenConfirmStart(courseToStart);
  }
  function onCloseConfirmStart() {
    setOpenConfirmStart(undefined);
  }
  function onCloseDrawer() {
    setSelectedCourse(undefined);
  }
  function onOpenDrawer(courseDetailId: string) {
    setSelectedCourse(coursesMap.get(courseDetailId));
  }

  return {
    openDrawer: !!selectedCourse,
    onCloseDrawer,
    onOpenDrawer,
    selectedCourse,
    selectedCourseCanStart,
    correlativesCoursesStatus,
    openConfirmStart,
    onOpenConfirmStart,
    onCloseConfirmStart,
  };
}
