import { Key, useState, useEffect } from "react";

import { Course } from "@/interfaces/Course";
export function useCourseSelect(courses: Course[]) {
  const [correlativesSelected, setCorrelativesSelected] = useState<Course[]>(
    [],
  );
  const [availableCorrelativesToSelect, setAvailableCorrelativesToSelect] =
    useState<Course[]>([]);

  useEffect(() => {
    setAvailableCorrelativesToSelect(courses.map((c) => c));
  }, []);
  function onSelectCorrelative(correlativeId: Key | null) {
    if (correlativeId === null) return;
    const correlative = availableCorrelativesToSelect.find(
      (course: Course) => course.id === correlativeId,
    );

    if (!correlative) return;
    setCorrelativesSelected((prevState: Course[]) => {
      const prevAvailableCorrelatives = availableCorrelativesToSelect;
      const coursesToAdd: Course[] = [];

      recursivelyAddsCorrelatives(
        prevAvailableCorrelatives,
        coursesToAdd,
        correlative,
      );
      const newState = [...prevState, ...coursesToAdd];

      setAvailableCorrelativesToSelect(prevAvailableCorrelatives);

      return newState;
    });
  }
  function onRemoveCourse(course: Course) {
    setCorrelativesSelected((prevState: Course[]) => {
      const coursesToAddToAvailables: Course[] = [];
      const selectedCourses = prevState;

      removeCourseRecursively(
        selectedCourses,
        coursesToAddToAvailables,
        course,
      );
      setAvailableCorrelativesToSelect((prevState) => [
        ...prevState,
        ...coursesToAddToAvailables,
      ]);

      return selectedCourses;
    });
  }

  return {
    correlativesSelected,
    availableCorrelativesToSelect,
    onSelectCorrelative,
    onRemoveCourse,
  };
}

function recursivelyAddsCorrelatives(
  courses: Course[],
  coursesToAdd: Course[],
  correlative: Course,
) {
  coursesToAdd.push(correlative);
  const idx = courses.findIndex(
    (course: Course) => course.id === correlative.id,
  );

  courses.splice(idx, 1);
  if (correlative.correlatives.length === 0) return;
  for (const crv of correlative.correlatives) {
    recursivelyAddsCorrelatives(courses, coursesToAdd, crv);
  }
}

function removeCourseRecursively(
  coursesSelected: Course[],
  coursesToAddToAvailables: Course[],
  course: Course,
) {
  const idx = coursesSelected.findIndex(
    (selectedCourse: Course) => selectedCourse.id === course.id,
  );

  coursesSelected.splice(idx, 1);
  coursesToAddToAvailables.push(course);
  if (course.correlatives.length === 0) return;
  for (const crv of course.correlatives) {
    removeCourseRecursively(coursesSelected, coursesToAddToAvailables, crv);
  }
}
