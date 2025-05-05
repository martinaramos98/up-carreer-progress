import GradeItem from "./GradeItem/GradeItem";

import { Grade } from "@/interfaces/Grade";

type Props = {
  grades: Grade[];
};

const GradeList = (props: Props) => {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10 w-full">
      <h2 className="text-2xl font-bold mb-4">Your Grades</h2>
      <ul className="w-full gap-4 flex flex-col">
        {props.grades.map((grade) => (
          <GradeItem key={grade.id} grade={grade} />
        ))}
      </ul>
    </section>
  );
};

export default GradeList;
