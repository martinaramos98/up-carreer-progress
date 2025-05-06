export function convertObjectToArrayCourse(grade: GradeResult) {
  convertObjectStringToArrayStringCorrelatives(grade.courses);
  grade.courses = grade.courses.map((course)=>(course.courses))
}

function convertObjectStringToArrayStringCorrelatives(courses:CoursesObjectResult[]) {
  courses.forEach((course) => { 
    course.courses.correlatives = course.courses.correlatives.map((corr)=>(corr.correlative));
   })
}

export interface CorrelativesObjectResult {
  correlatives: string[]
}
export interface GradeResult {
  name:string;
  description:string;
  id:string;
  totalCourses:number;
  approved:number;
  courses: CoursesObjectResult[]
}

export interface CoursesObjectResult {
  courses:{
    id:string;
    name:string;
    year:number;
    perdiod:string;
    correlatives: {correlative:string}[]
  }
}
