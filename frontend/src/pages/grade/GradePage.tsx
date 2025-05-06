import "@xyflow/react/dist/style.css";
import { Tabs, Tab } from "@heroui/tabs";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import MapFlowView from "@/components/GradesViews/MapFlowView";
import DiagramView from "@/components/GradesViews/DiagramView/DiagramView";
import { useGrade } from "@/hooks/useGrade.hook";
import { IGradeService } from "@/services/GradeService/GradeService.service";

export interface GradePageProps {
  gradeService: IGradeService;
}

const GradePage = (props: GradePageProps) => {
  const { gradeId } = useParams();
  const { grade, error, isLoading } = useGrade(
    props.gradeService,
    gradeId as string,
  );

  return (
    <DefaultLayout>
      <header className="mb-4">
        <h1 className="text-3xl font-semibold"> {grade?.name} </h1>
        <p className="dark:text-gray-400 text-gray-600 text-sm max-w-[400px]">
          {grade?.description}
        </p>
      </header>
      {grade && (
        <Tabs
          classNames={{ base: "w-full justify-end", panel: "w-full h-full" }}
        >
          <Tab key={"Map"} title={"Map"}>
            <MapFlowView grade={grade} />
          </Tab>
          <Tab key={"Diagram"} className="w-full h-full" title={"Diagram"}>
            <DiagramView grade={grade} />
          </Tab>
        </Tabs>
      )}
    </DefaultLayout>
  );
};

export default GradePage;
