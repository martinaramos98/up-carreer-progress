import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";

import CourseSelector from "@/components/CourseSelector";
import DefaultLayout from "@/layouts/default";
import { useNewGradeForm } from "@/hooks/useNewGradeForm.hook";

const NewGradePage = () => {
  function handleSubmit() {}
  const {
    selectedCourses,
    // startDate,
    description,
    gradeName,
    handleCourseSelect,
    handleDescriptionChange,
    handleGradeNameChange,
    // handleStartDateChange,
  } = useNewGradeForm();

  return (
    <DefaultLayout>
      <article className="w-[500px] mx-auto max-w-full">
        <h1 className="text-2xl font-semibold">New Grade</h1>
        <Form className="items-center" onSubmit={handleSubmit}>
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
          <DatePicker label="Fecha de Inicio" />
          <CourseSelector
            addCourses={handleCourseSelect}
            selectedCourses={selectedCourses}
          />
          <Button color="primary" type="submit" variant="flat">
            Create Grade
          </Button>
        </Form>
      </article>
    </DefaultLayout>
  );
};

export default NewGradePage;
