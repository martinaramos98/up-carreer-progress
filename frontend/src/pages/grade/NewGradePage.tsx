import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";

import CourseSelector from "@/components/CourseSelector";
import DefaultLayout from "@/layouts/default";
import { useNewGradeForm } from "@/hooks/useNewGradeForm.hook";
import { IGradeService } from "@/services/GradeService/GradeService.service";
import { ICourseService } from "@/services/CoursesService/CourseService.service";

export interface NewGradePageProps {
  gradeService: IGradeService;
  courseService: ICourseService;
}

const NewGradePage = (props: NewGradePageProps) => {
  const {
    selectedCourses,
    description,
    gradeName,
    years,
    isPending,
    handleCourseSelect,
    handleDescriptionChange,
    handleGradeNameChange,
    handleStartDateChange,
    startDate,
    submitAction,
    handleYearsChange,
  } = useNewGradeForm(props.gradeService);

  return (
    <DefaultLayout>
      <article className="w-[500px] mx-auto max-w-full">
        <h1 className="text-2xl font-semibold">New Grade</h1>
        <Form action={submitAction} className="items-center">
          <Input
            label="Grade Name"
            type="text"
            value={gradeName}
            onChange={handleGradeNameChange}
          />
          <Textarea
            label="Descripcion"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Input
            label="Years of Study"
            type="number"
            value={years.toString()}
            onChange={handleYearsChange}
          />
          <DatePicker
            label="Fecha de Inicio"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <CourseSelector
            addCourses={handleCourseSelect}
            courseService={props.courseService}
            selectedCourses={selectedCourses}
          />
          <Button
            color="primary"
            disabled={isPending}
            isLoading={isPending}
            type="submit"
            variant="flat"
          >
            Create Grade
          </Button>
        </Form>
      </article>
    </DefaultLayout>
  );
};

export default NewGradePage;
