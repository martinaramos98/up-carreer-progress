import { NewCourse } from "../models/courses.ts";
import { DBClient } from "../db/dbController.ts";
import {
  courseCorrelativesTable,
  coursesTable,
} from "../db/libsql/schemas/courses.ts";
import { eq } from "drizzle-orm";

// TODO: add dbclient to the constructor
export class CoursesService {
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCourses() {
    try {
      return await this.dbClient.select().from(coursesTable);
    } catch (error) {
      console.error(error);
    }
  }

  async getCourseData(idCourse: string) {
    try {
      return await this.dbClient.select().from(coursesTable).where(
        eq(coursesTable.id, idCourse),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async addNewCourses(coursesData: NewCourse | NewCourse[]) {
    try {
      if (Array.isArray(coursesData)) {
        const res = await this.dbClient.insert(coursesTable).values(
          coursesData.map((course) => ({
            name: course.name,
            description: course.description,
            period: course.period,
          })),
        ).returning({ id: coursesTable.id });
        const rows: Promise<void>[] = [];
        res.forEach((id, idx) => {
          rows.push(this.insertCorrelatives(
            id.id,
            coursesData[idx].correlativesCourses,
          ));
        });
        await Promise.all(rows);
      } else {
        const res = await this.dbClient.insert(coursesTable).values({
          name: coursesData.name,
          description: coursesData.description,
          period: coursesData.period,
        }).returning({ id: coursesTable.id });
        await this.insertCorrelatives(
          res[0].id,
          coursesData.correlativesCourses,
        );
        return res;
      }
    } catch (error) {
      console.error(error);
    }
  }
  private async insertCorrelatives(
    courseId: string,
    correlativesCourse: string[],
  ) {
    await this.dbClient.insert(courseCorrelativesTable).values(
      correlativesCourse.map((correlative) => ({
        correlative,
        course: courseId,
      })),
    );
  }
  private async getCorrelatives(courseId: string) {
    try {
      return await this.dbClient.select().from(courseCorrelativesTable).where(
        eq(courseCorrelativesTable.course, courseId),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCourse(idCourse: string) {
    try {
      return (await this.dbClient.delete(coursesTable).where(
        eq(coursesTable.id, idCourse),
      )).toJSON();
    } catch (error) {
      console.error(error);
    }
  }
  async updateCourse(idCourse: string, courseData: NewCourse) {
    try {
      const result = await this.dbClient.update(coursesTable).set({
        name: courseData.name,
        description: courseData.description,
        period: courseData.period,
      }).where(eq(coursesTable.id, idCourse));
      const correlativesStatus = await this.getCorrelatives(idCourse);
      const coursesToDelete = correlativesStatus?.filter((
        corr,
      ) => (!courseData.correlativesCourses.includes(corr.correlative)));
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
