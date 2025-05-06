
export interface NewCarreer{
  name:string;
  description:string;
  startDate:string;
  duration:number;
  // FIXME: Ver bien que tipo va en realidad
  courses: string[];  
}