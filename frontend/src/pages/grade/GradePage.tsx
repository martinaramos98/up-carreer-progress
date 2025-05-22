import "@xyflow/react/dist/style.css";
import { Tabs, Tab } from "@heroui/tabs";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import MapFlowView from "@/components/GradesViews/MapFlowView";
import DiagramView from "@/components/GradesViews/DiagramView/DiagramView";
import { useGrade } from "@/hooks/useGrade.hook";
import { IGradeService } from "@/services/GradeService/GradeService.service";
import { ICourseService } from "@/services/CoursesService/CourseService.service";
import { useCourseDetail } from "@/hooks/useCourseDetail.hook";
import DetailCourseDrawer from "@/components/DetailCourseDrawer/DetailCourseDrawer";
import { GradeCourse } from "@/interfaces/Course";
import ModalStartCourse from "@/components/ModalStartCourse/ModalStartCourse";
import { useGradeCourses } from "@/hooks/useGradeCourses.hook";

export interface GradePageProps {
  gradeService: IGradeService;
  courseService: ICourseService;
}

const GradePage = (props: GradePageProps) => {
  const { gradeId } = useParams();
  const { grade, error, isLoading } = useGrade(
    props.gradeService,
    gradeId as string,
  );

  const {
    openDrawer,
    onCloseDrawer,
    onOpenDrawer,
    selectedCourse,
    selectedCourseCanStart,
    correlativesCoursesStatus,
    onCloseConfirmStart,
    onOpenConfirmStart,
    openConfirmStart,
  } = useCourseDetail(grade?.courses ?? []);
  const { gradeCourses, startNewCourse, updateCourseStatus } = useGradeCourses(
    props.courseService,
    grade?.courses,
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
        <>
          <Tabs
            classNames={{ base: "w-full justify-end", panel: "w-full h-full" }}
          >
            <Tab key={"Map"} title={"Map"}>
              <MapFlowView
                courses={gradeCourses as GradeCourse[]}
                grade={grade}
                onOpenConfirmStart={onOpenConfirmStart}
                onOpenDetailCourse={onOpenDrawer}
              />
            </Tab>
            <Tab key={"Diagram"} className="w-full h-full" title={"Diagram"}>
              <DiagramView
                courses={gradeCourses as GradeCourse[]}
                grade={grade}
                onOpenConfirmStart={onOpenConfirmStart}
                onOpenDetailCourse={onOpenDrawer}
              />
            </Tab>
          </Tabs>
          <DetailCourseDrawer
            correlativesCoursesStatus={correlativesCoursesStatus}
            course={selectedCourse as GradeCourse}
            open={openDrawer}
            selectedCourseCanStart={selectedCourseCanStart}
            onClose={onCloseDrawer}
            onOpenConfirmStart={onOpenConfirmStart}
            onUpdateCourseStatus={updateCourseStatus}
          />
          <ModalStartCourse
            gradeId={grade.id as string}
            openConfirmStartCourse={openConfirmStart}
            startNewCourseHandler={startNewCourse}
            onCloseConfirmStartCourse={onCloseConfirmStart}
          />
        </>
      )}
    </DefaultLayout>
  );
};

export default GradePage;
