export interface NewCourse {
  name: string;
  description: string;
  // start_date: Date;
  // end_date: Date;
  // FIXME: Ver bien que tipo va en realidad
  period: string;
  correlativesCourses: string[];
}
