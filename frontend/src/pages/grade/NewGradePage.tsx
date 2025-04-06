import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { Form } from "@heroui/form";

import CourseSelector from "@/components/CourseSelector";
import DefaultLayout from "@/layouts/default";
import { useNewGradeForm } from "@/hooks/useNewGradeForm.hook";

type Props = {};
const NewGradePage = (props: Props) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {}
  const {
    selectedCourses,
    startDate,
    description,
    gradeName,
    handleCourseSelect,
    handleDescriptionChange,
    handleGradeNameChange,
    handleStartDateChange,
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
        </Form>
      </article>
    </DefaultLayout>
  );
};

export default NewGradePage;
