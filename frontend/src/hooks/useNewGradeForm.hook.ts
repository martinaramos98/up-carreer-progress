import { useActionState, useState } from "react";
import { addToast } from "@heroui/toast";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

import { Course } from "@/interfaces/Course";
import { IGradeService } from "@/services/GradeService/GradeService.service";
export function useNewGradeForm(gradeService: IGradeService) {
  const [gradeName, setGradeName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<ZonedDateTime>(
    parseAbsoluteToLocal(new Date().toISOString()),
  );
  const [years, setYears] = useState<number>(NaN);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [result, submitAction, isPending] = useActionState(
    handleSubmit,
    undefined,
  );

  function handleGradeNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGradeName(event.target.value);
  }
  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function handleStartDateChange(date: ZonedDateTime) {
    setStartDate(date);
  }
  function handleYearsChange(event: React.ChangeEvent<HTMLInputElement>) {
    setYears(parseInt(event.target.value));
  }
  function handleCourseSelect(courses: Course[]) {
    const filteredCourses = courses.filter(
      (course) =>
        !selectedCourses.some((selected) => selected.id === course.id),
    );

    setSelectedCourses([...selectedCourses, ...filteredCourses]);
  }
  async function handleSubmit() {
    try {
      const result = await gradeService.createGrade({
        name: gradeName,
        description,
        startDate: startDate.toAbsoluteString(),
        years: years,
        courses: selectedCourses.map((course) => course.id),
      });

      if (!result.error) {
        addToast({
          title: "Grade created successfully",
          description: "Grade was created with id: " + result.data.id,
        });
      }

      return result;
    } catch (error) {
      console.error("Error creating grade:", error);
    }
  }

  return {
    startDate,
    selectedCourses,
    description,
    gradeName,
    years,
    handleDescriptionChange,
    handleGradeNameChange,
    handleStartDateChange,
    handleCourseSelect,
    handleYearsChange,
    submitAction,
    isPending,
    result,
  };
}
