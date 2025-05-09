import { useEffect, useState } from "react";

import { IGradeService } from "@/services/GradeService/GradeService.service";
import { Grade } from "@/interfaces/Grade";
import { convertCourseToTreeCourse } from "@/utils/recursive.util";
import { GradeCourse } from "@/interfaces/Course";
import { parseToDateArrayProp } from "@/utils/parse.util";

export function useGrade(gradeService: IGradeService, gradeId: string) {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getGradeData() {
    try {
      setIsLoading(true);
      const grade = (await gradeService.getGrade(gradeId)).data as Grade;

      grade.courses = grade.courses.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      const coursesTree: GradeCourse[] = [];

      grade.courses.forEach((course) => {
        parseToDateArrayProp(course.takedCourses, "startDate");
      });
      convertCourseToTreeCourse(grade.courses, coursesTree);

      grade.courses = coursesTree;
      setGrade(grade);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching grade data:", error);
      setError("Error fetching grade data");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getGradeData();
  }, []);

  return {
    grade,
    error,
    isLoading,
  };
}
