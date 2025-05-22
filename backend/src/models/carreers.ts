import { Carreer } from "../db/libsql/schemas/carreers.ts";

export interface NewCarreer{
  name:string;
  description:string;
  startDate:string;
  duration:number;
  // FIXME: Ver bien que tipo va en realidad
  courses: string[];  
}
export interface CarreerWithCourses extends Carreer {
  totalCourses: number;
  approved: number;
  courses: [] 
}