export interface Course {
  id: string;
  name: string;
  description: string;
  correlatives: Course[];
  period: number;
  year: number;
}
export interface GradeCourse extends Course {
  status: GradeCourseStatus;
  history: TakedCourse[];
}
export interface TakedCourse extends Course {
  status: GradeCourseStatus;
  startDate: Date;
  gradeId: string;
  endDate: Date;
  professor?: string;
}
export interface NewCourse {
  name: string;
  description: string;
  correlatives: Course[];
  period: number;
  year: number;
}

export interface CourseHistoryRegistry {
  startDate: Date;
  endDate: Date;
  lastState: GradeCourseStatus;
  gradeId: string;
}

export type GradeCourseStatus =
  | "not started"
  | "in progress"
  | "completed"
  | "exam-pending";
