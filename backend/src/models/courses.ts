import { Course } from "../db/libsql/schemas/courses.ts";

export interface NewCourse {
  name: string;
  description: string;
  // start_date: Date;
  // end_date: Date;
  // FIXME: Ver bien que tipo va en realidad
  period: string;
  year: number;
  correlativesCourses: string[];
}

export interface CarreerCourse extends Course {
  correlatives: string[];
  takedCourses: TakedCourse[];
  status: CourseStatus;

}

export interface TakedCourse {
  startDate: string;
  status: CourseStatus;
  professor?: string;
  gradeId: string;
  courseId: string;

}

export interface NewTakedCourse {
  startDate: string;
  professor?: string;
  gradeId: string;
  courseId: string;
}
export type CourseStatus = | "not started"
  | "in progress"
  | "completed"
  | "exam pending"
  | "pending correlatives"
  | "abandoned"
  | "reenrolled"
  ;
