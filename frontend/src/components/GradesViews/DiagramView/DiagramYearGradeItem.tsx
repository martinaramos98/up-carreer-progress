import React from "react";

import DiagramCourseItem from "./DiagramCourseItem";

import { GradeCourse } from "@/interfaces/Course";

type Props = {
  gradeStartDate: Date;
  yearCourses: { year: number; courses: GradeCourse[] };
};

const DiagramYearGradeItem = (props: Props) => {
  return (
    <>
      <section
        key={props.yearCourses.year}
        className="flex flex-col gap-2 bg-zinc-900 p-4 rounded-2xl"
      >
        <header>
          <h2 className="text-xl text-gray-500">
            Ciclo -{" "}
            {props.gradeStartDate.getFullYear() + props.yearCourses.year}
          </h2>
        </header>
        <section>
          <div className="flex flex-row gap-2">
            {props.yearCourses.courses.map((course) => (
              <DiagramCourseItem key={course.id} course={course} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default DiagramYearGradeItem;
