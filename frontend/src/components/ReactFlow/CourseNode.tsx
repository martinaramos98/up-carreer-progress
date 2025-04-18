import { Handle, Position } from "@xyflow/react";

import { Course } from "@/interfaces/Course";

type Props = {
  data: { course: Course };
};

const CourseNode = (props: Props) => {
  return (
    <div className="bg-gray-200/80 dark:bg-gray-900/80 rounded-2xl p-4 w-[200px]">
      {props.data.course.correlatives.length > 0 && (
        <Handle
          id={props.data.course.id + " target"}
          isConnectable={true}
          position={Position.Top}
          type="target"
        />
      )}
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{props.data.course.name}</span>
        <span className="text-xs  text-zinc-500">
          Aun no has iniciado esta cursada
        </span>
      </div>

      <Handle
        id={props.data.course.id + " source"}
        isConnectable={props.data.course.correlatives.length > 0}
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
};

export default CourseNode;
