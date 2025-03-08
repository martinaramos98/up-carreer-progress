import { NewCourse } from "../models/courses.ts";
import { DBClient } from "../db/dbController.ts";

// TODO: add dbclient to the constructor
export class CoursesService {
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCourses() {
  }

  async getCourseData(idCourse: string) {}
  async addNewCourse(courseData: NewCourse) {}
}
