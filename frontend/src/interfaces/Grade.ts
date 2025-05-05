import { Course } from "./Course";

export interface Grade {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  years: number;
  courses: Course[];
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
