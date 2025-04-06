import { useState } from "react";

import { Course } from "@/interfaces/Course";
export function useNewGradeForm() {
  const [gradeName, setGradeName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  function handleGradeNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGradeName(event.target.value);
  }
  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }
  function handleStartDateChange(date: Date | null) {
    setStartDate(date);
  }
  function handleCourseSelect(courses: Course[]) {
    setSelectedCourses(courses);
  }

  return {
    startDate,
    selectedCourses,
    description,
    gradeName,
    handleDescriptionChange,
    handleGradeNameChange,
    handleStartDateChange,
    handleCourseSelect,
  };
}
