import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Key } from "react";

import { Course } from "@/interfaces/Course";
type Props = {
  courses: Course[];
  onSelectCorrelative: (correlative: Key | null) => void;
};
const CorrelativeSelector = (props: Props) => {
  return (
    <Autocomplete
      aria-label="Correlative Autocomplete Selector"
      onSelectionChange={props.onSelectCorrelative}
    >
      {props.courses.map((course: Course) => (
        <AutocompleteItem key={course.id} description={course.description}>
          {course.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default CorrelativeSelector;
