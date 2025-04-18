import { Button } from "@heroui/button";

import { GradeCourse } from "@/interfaces/Course";

type Props = {
  course: GradeCourse;
};

const DiagramCourseItem = (props: Props) => {
  return (
    <div
      key={props.course.id}
      className="bg-gray-200/80 dark:bg-zinc-800/80 rounded-2xl p-4 w-full h-[85px] flex flex-row"
    >
      <div>
        <span>{props.course.name}</span>
        <span className="text-xs ml-2 text-zinc-500">
          Aun no has iniciado esta cursada
        </span>
      </div>

      <div className="flex flex-col ml-auto gap-2 h-full">
        <Button
          disableRipple
          className="text-zinc-500"
          size="sm"
          variant="light"
        >
          Detalle de la Materia
        </Button>
        <Button className="rounded-lg" variant="flat">
          Iniciar Cursada
        </Button>
      </div>
    </div>
  );
};

export default DiagramCourseItem;
