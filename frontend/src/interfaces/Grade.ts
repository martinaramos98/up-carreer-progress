import { Course } from "./Course";

export interface Grade {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  years: number;
  courses: Course[];
}

export interface GradeCreate {
  name: string;
  description: string;
  startDate: Date;
  years: number;
  courses: Course[];
}
