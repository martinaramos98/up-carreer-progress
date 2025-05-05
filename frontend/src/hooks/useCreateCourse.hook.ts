import { Key, useState, useEffect } from "react";
import * as Yup from "yup";
import { SharedSelection } from "@heroui/system";

import { Course, NewCourse } from "@/interfaces/Course";
export function useCreateCourse(
  courses: Course[] = [],
  createCourse: (course: NewCourse) => void,
) {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    period: Yup.number().required("Period is required"),
    year: Yup.number().required("Year is required"),
  });
  const [correlativesSelected, setCorrelativesSelected] = useState<Course[]>(
    [],
  );
  const [courseData, setCourseData] = useState<NewCourse>({
    name: "",
    description: "",
    correlativesCourses: [],
    period: "",
    year: NaN,
  });
  const [errors, setErrors] = useState<Yup.InferType<typeof schema>>();

  const courseMap = new Map<Key, Course>(
    courses.map((course) => [course.id, structuredClone(course)]),
  );
  const [availableCorrelativesToSelect, setAvailableCorrelativesToSelect] =
    useState<Course[]>([]);

  useEffect(() => {
    setAvailableCorrelativesToSelect(courses.map((c) => c));
  }, []);

  function onSelectCorrelative(correlativeId: Key | null) {
    if (correlativeId === null) return;
    const correlative = courseMap.get(correlativeId);

    if (!correlative) return;
    setCorrelativesSelected((prevState: Course[]) => {
      const prevAvailableCorrelatives = availableCorrelativesToSelect;
      let coursesToAdd: Course[] = [];

      recursivelyAddsCorrelatives(
        prevAvailableCorrelatives,
        coursesToAdd,
        correlative,
      );
      coursesToAdd = coursesToAdd.filter(
        (courseToAdd) =>
          !prevState.some((selected) => selected.id === courseToAdd.id),
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
  async function onCreateCourseHandler() {
    if (!schema.isValidSync(courseData, { abortEarly: true })) {
      const currentErrors = await schema.validate(courseData);

      setErrors(currentErrors);

      return;
    }
    createCourse({
      name: courseData.name,
      description: courseData.description,
      period: courseData.period,
      year: parseInt(courseData.year),
      correlativesCourses: correlativesSelected.map(
        (correlative: Course) => correlative.id,
      ),
    });
  }
  function onChageInputDataForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCourseData({ ...courseData, [name]: value });
  }
  function onSelectPeriodHandler(keys: SharedSelection) {
    setCourseData({
      ...courseData,
      period: keys.anchorKey as string,
    });
  }

  return {
    correlativesSelected,
    availableCorrelativesToSelect,
    onSelectCorrelative,
    onRemoveCourse,
    onCreateCourseHandler,
    errors,
    onChageInputDataForm,
    onSelectPeriodHandler,
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
