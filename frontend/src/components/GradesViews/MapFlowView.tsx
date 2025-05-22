import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  type Edge,
} from "@xyflow/react";

import { Grade } from "@/interfaces/Grade";
import CourseNode from "@/components/ReactFlow/CourseNode";
import { Course, GradeCourse } from "@/interfaces/Course";

type Props = {
  grade: Grade;
  onOpenDetailCourse: (courseId: string) => void;
  onOpenConfirmStart: (course: GradeCourse) => void;
  courses: GradeCourse[] | null;
};

const MapFlowView = (props: Props) => {
  const yearIdx: Record<number, number> = {};
  const [nodes, setNodes] = useState(
    props.courses?.map((course) => {
      if (yearIdx[course.year] === undefined) {
        yearIdx[course.year] = 0;
      } else {
        yearIdx[course.year] += 1;
      }

      return {
        id: course.id,
        type: "courseNode",
        position: { x: yearIdx[course.year] * 400, y: (course.year - 1) * 200 },
        data: {
          course,
          onOpenDetailCourse: props.onOpenDetailCourse,
          onOpenConfirmStart: props.onOpenConfirmStart,
        },
      };
    }),
  );
  const [edges] = useState<Edge[]>(calculateEdges(props.grade.courses));

  const nodeTypes = {
    courseNode: CourseNode,
  };

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        fitView
        edges={edges}
        edgesFocusable={false}
        edgesReconnectable={false}
        nodeTypes={nodeTypes}
        nodes={nodes}
        nodesDraggable={false}
        snapToGrid={false}
        onNodesChange={onNodesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MapFlowView;
function calculateEdges(courses: Course[]) {
  const edges: Edge[] = [];

  courses.forEach((course) => {
    course.correlatives.forEach((correlative) => {
      edges.push({
        id: `${correlative.id}-${course.id}`,
        source: correlative.id,
        target: course.id,
      });
    });
  });

  return edges;
}
