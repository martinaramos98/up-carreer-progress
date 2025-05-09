import DiagramCourseItem from "./DiagramCourseItem";

import { GradeCourse } from "@/interfaces/Course";

type Props = {
  gradeStartDate: Date;
  yearCourses: { year: number; courses: GradeCourse[] };
  onOpenConfirmStart: (course: GradeCourse) => void;
  onOpenDetailCourse: (courseId: string) => void;
};

const DiagramYearGradeItem = (props: Props) => {
  return (
    <>
      <section
        key={props.yearCourses.year}
        className="flex flex-col gap-2 dark:bg-zinc-900 bg-zinc-100 p-4 rounded-2xl"
      >
        <header>
          <h2 className="text-xl text-gray-500">
            Ciclo -{" "}
            {props.gradeStartDate.getFullYear() + props.yearCourses.year - 1}
          </h2>
        </header>
        <section>
          <div className="flex flex-row gap-2">
            {props.yearCourses.courses.map((course) => (
              <DiagramCourseItem
                key={course.id}
                course={course}
                onOpenConfirmStart={props.onOpenConfirmStart}
                onOpenDetailCourse={props.onOpenDetailCourse}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default DiagramYearGradeItem;
