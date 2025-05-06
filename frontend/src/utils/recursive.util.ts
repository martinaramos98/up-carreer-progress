import { Course, CourseWithCorrelatives } from "@/interfaces/Course";

export function convertCourseToTreeCourse(
  coursesList: CourseWithCorrelatives[],
  coursesTree: Course[],
) {
  const courseMap = new Map<string, CourseWithCorrelatives>(
    coursesList.map((course) => [course.id, structuredClone(course)]),
  );

  try {
    coursesList.forEach((course) => {
      recursiveConvertionToTreeCourse(courseMap, course);
      coursesTree.push(course as Course);
    });
  } catch (error) {
    console.error(error);
  }
}

function recursiveConvertionToTreeCourse(
  courseMap: Map<string, CourseWithCorrelatives>,
  course: Course | CourseWithCorrelatives,
) {
  const correlatives = course.correlatives;

  course.correlatives = [];
  if (!correlatives || correlatives.length === 0) return;
  correlatives.forEach((correlative) => {
    // const correlativeCourseCopy = { ...courseMap.get(correlative) } as Course;

    const correlativeCourseCopy = structuredClone(
      courseMap.get(correlative as string) as CourseWithCorrelatives,
    );

    course.correlatives.push(correlativeCourseCopy);
    recursiveConvertionToTreeCourse(courseMap, correlativeCourseCopy);
  });
}
