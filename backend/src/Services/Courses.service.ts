import { NewCourse, NewTakedCourse, TakedCourse } from "../models/courses.ts";
import { DBClient } from "../db/dbController.ts";
import {
  courseCorrelativesTable,
  coursesTable,
  CourseWithCorrelatives,
  takedCoursesTable,
} from "../db/libsql/schemas/courses.ts";
import { eq, and, inArray } from "drizzle-orm";

// TODO: add dbclient to the constructor
export class CoursesService {
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCourses() {
    try {
      const courses = await this.dbClient.select().from(coursesTable);
      const correlatives = await this.dbClient.select().from(courseCorrelativesTable);
      const correlativesMap = new Map<string, string[]>();
      correlatives.forEach((correlative) => {
        if (!correlativesMap.has(correlative.course)) {
          correlativesMap.set(correlative.course, []);
        }
        correlativesMap.get(correlative.course)?.push(correlative.correlative);
      })
      courses.forEach((course) => {
        (course as CourseWithCorrelatives).correlatives = correlativesMap.get(course.id) || [];
      })
      return courses;
    } catch (error) {
      console.error(error);
    }
  }

  async getCourseData(idCourse: string) {
    try {
      return await this.dbClient
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.id, idCourse));
    } catch (error) {
      console.error(error);
    }
  }
  async addNewCourses(coursesData: NewCourse | NewCourse[]) {
    try {
      if (Array.isArray(coursesData)) {
        await this.dbClient.transaction(async (tx) => {
        const res = await tx
          .insert(coursesTable)
          .values(
            coursesData.map((course) => ({
              name: course.name,
              description: course.description,
              period: course.period,
              year: course.year,
            }))
          )
          .returning({ id: coursesTable.id });
        const rows: Promise<void>[] = [];
        res.forEach((id, idx) => {
          rows.push(
            this.insertCorrelatives(id.id, coursesData[idx].correlativesCourses,tx)
          );
        });
        await Promise.all(rows);

        })
        return await this.getCourses();
      } else {
        await this.dbClient.transaction(async (tx) => {
          
        const res = await tx 
          .insert(coursesTable)
          .values({
            name: coursesData.name,
            description: coursesData.description,
            period: coursesData.period,
            year: coursesData.year,
          })
          .returning({ id: coursesTable.id });
        if (coursesData.correlativesCourses.length > 0) {
          await this.insertCorrelatives(
            res[0].id,
            coursesData.correlativesCourses,
            tx
          );
        }
        })

        return await this.getCourses();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  private async insertCorrelatives(
    courseId: string,
    correlativesCourse: string[],
    tx: any
  ) {
    if (correlativesCourse.length === 0) return;
    await tx.insert(courseCorrelativesTable).values(
      correlativesCourse.map((correlative) => ({
        correlative,
        course: courseId,
      }))
    );
  }
  private async getCorrelatives(courseId: string) {
    try {
      return await this.dbClient
        .select()
        .from(courseCorrelativesTable)
        .where(eq(courseCorrelativesTable.course, courseId));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteCourse(idCourse: string) {
    try {
      return (
        await this.dbClient
          .delete(coursesTable)
          .where(eq(coursesTable.id, idCourse))
      ).toJSON();
    } catch (error) {
      console.error(error);
    }
  }
  async updateCourse(idCourse: string, courseData: NewCourse) {
    try {
      return await this.dbClient.transaction(async (tx) => {
        const res = await tx
          .update(coursesTable)
          .set({
            name: courseData.name,
            description: courseData.description,
            period: courseData.period,
          })
          .where(eq(coursesTable.id, idCourse));
        const currentCorrelatives = await this.getCorrelatives(idCourse);

        const correlativesToDelete = currentCorrelatives.filter(
          (course) => !courseData.correlativesCourses.includes(course.course)
        );
        if (correlativesToDelete.length > 0) {
          await tx.delete(courseCorrelativesTable).where(
            and(
              eq(courseCorrelativesTable.course, idCourse),
              inArray(
                courseCorrelativesTable.correlative,
                correlativesToDelete.map(
                  (correlative) => correlative.correlative
                )
              )
            )
          );
        }
      const correlativeToAdd = courseData.correlativesCourses.filter((correlative)=>(!currentCorrelatives.includes({correlative, course:idCourse})));
      if (correlativeToAdd.length > 0) {
        await tx.insert(courseCorrelativesTable).values(
          correlativeToAdd.map((correlative) => ({course: idCourse, correlative:correlative })));
      } 
        return res.toJSON();
      });
    } catch (error) {
      console.error(error);
    }
  }
  async startNewCourse(newTakedCourse: NewTakedCourse){
    try {
      await this.dbClient.insert(takedCoursesTable).values({
        startDate: newTakedCourse.startDate,
        professor: newTakedCourse.professor,
        carreer: newTakedCourse.gradeId,
        course: newTakedCourse.courseId,
        status: "in progress",
      });
      return {
        ...newTakedCourse,
        status: "in progress",
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateStatusTakedCourse(takedCourseData: TakedCourse ){
    try {
      const result =  await this.dbClient
        .update(takedCoursesTable)
        .set({
          status: takedCourseData.status,
        })
        .where(
          and(
            eq(takedCoursesTable.course, takedCourseData.courseId),
            eq(takedCoursesTable.carreer, takedCourseData.gradeId),
            eq(takedCoursesTable.startDate, takedCourseData.startDate)
          )
        )
        if(result.rowsAffected === 0){
          throw new Error("Taked Course not found");
        }
        
        return result.toJSON();
        
    } catch (error) {
      console.error(error);
      throw error;

    }
  
  }
}
