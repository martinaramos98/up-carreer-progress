import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import axios from "axios";

import CourseSelector from "@/components/CourseSelector";
import DefaultLayout from "@/layouts/default";
import { useNewGradeForm } from "@/hooks/useNewGradeForm.hook";
import useGradeService from "@/services/GradeService/GradeService.service";
import { useCourseService } from "@/services/CoursesService/CourseService.service";

const NewGradePage = () => {
  const restAgent = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  });

  const gradeService = useGradeService(restAgent);
  const courseService = useCourseService(restAgent);
  const {
    selectedCourses,
    description,
    gradeName,
    years,
    isPending,
    handleCourseSelect,
    handleDescriptionChange,
    handleGradeNameChange,
    submitAction,
    handleYearsChange,
  } = useNewGradeForm(gradeService);

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
          <DatePicker label="Fecha de Inicio" />
          <CourseSelector
            addCourses={handleCourseSelect}
            courseService={courseService}
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
