import { useState } from "react";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

import { GradeCourse } from "@/interfaces/Course";

export function useConfirmStartCourse(
  course: GradeCourse,
  onCloseConfirmStart: () => void,
  onConfirmStartCourse: (
    courseId: string,
    gradeId: string,
    startDate: string,
    professor: string,
  ) => Promise<void>,
  gradeId: string,
) {
  const [startDate, setStartDate] = useState(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [professorName, setProfessorName] = useState("");

  function onUpdateInputDate(date: ZonedDateTime) {
    setStartDate(date);
  }
  function onUpdateInput(ev: React.ChangeEvent<HTMLInputElement>) {
    setProfessorName(ev.target.value);
  }
  async function onConfirmStartCourseHandler() {
    setIsLoading(true);
    await onConfirmStartCourse(
      course.id,
      gradeId,
      startDate.toAbsoluteString(),
      professorName,
    );
    setIsLoading(false);
  }

  return {
    startDate,
    professorName,
    onUpdateInputDate,
    onUpdateInput,
    onConfirmStartCourseHandler,
    isLoading,
  };
}
