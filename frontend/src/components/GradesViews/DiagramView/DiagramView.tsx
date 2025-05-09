import DiagramYearGradeItem from "./DiagramYearGradeItem";

import { Grade } from "@/interfaces/Grade";
import { Course, GradeCourse } from "@/interfaces/Course";

type Props = {
  grade: Grade;
  courses: GradeCourse[];
  onOpenDetailCourse: (courseId: string) => void;
  onOpenConfirmStart: (course: GradeCourse) => void;
};

const DiagramView = (props: Props) => {
  const coursesByYear = groupByYear(props.courses);

  return (
    <article className="flex flex-col gap-4">
      {coursesByYear.map((yearCourses) => (
        <DiagramYearGradeItem
          key={yearCourses.year}
          onOpenConfirmStart={props.onOpenConfirmStart}
          onOpenDetailCourse={props.onOpenDetailCourse}
          gradeStartDate={new Date(props.grade.startDate)}
          //@ts-expect-error FIXME: change when TakedCourseGrade is defined in backend
          yearCourses={yearCourses}
        />
      ))}
    </article>
  );
};

export default DiagramView;

function groupByYear(courses: Course[]): { year: number; courses: Course[] }[] {
  return courses.reduce<{ year: number; courses: Course[] }[]>((acc, obj) => {
    // Si este año ya existe en el acumulador, añadir el objeto al array items
    if (acc[obj.year]) {
      acc[obj.year].courses.push(obj);
    } else {
      // Si este año no existe, crear nueva entrada con el año y un array que contiene este objeto
      acc[obj.year] = {
        year: obj.year,
        courses: [obj],
      };
    }

    return acc;
  }, []);
}
