import { GradeCourse } from "./Course";

export interface Grade {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  years: number;
  courses: GradeCourse[];
  approved: number;
  totalCourses: number;
}

export interface GradeCreate {
  name: string;
  description: string;
  startDate: Date;
  years: number;
  courses: string[];
}
