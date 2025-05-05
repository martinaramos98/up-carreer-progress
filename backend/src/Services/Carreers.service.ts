import { NewCarreer } from "../models/carreers.ts";
import type { DBClient } from "../db/dbController.ts";
import {
  Carreer,
  carreerCoursesTable,
  carrersTable,
} from "../db/libsql/schemas/carreers.ts";
import {
  courseCorrelativesTable,
  coursesTable,
  periodCoursesTable,
  takedCoursesTable,
} from "../db/libsql/schemas/courses.ts";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db/libsql/db.ts";

export class CarreerService {
  // TODO: add dbclient to the constructor
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCarreers() {
    try {
      return await this.dbClient
        .select({
          name: carrersTable.name,
          description: carrersTable.description,
          id: carrersTable.id,
          totalCourses: count(carreerCoursesTable.courses),
          approved:
            sql`SUM(CASE WHEN ${takedCoursesTable.status} = 'completed' THEN 1 ELSE 0 END)`,
        })
        .from(carrersTable)
        .leftJoin(
          takedCoursesTable,
          eq(carrersTable.id, takedCoursesTable.carreer),
        )
        .innerJoin(
          carreerCoursesTable,
          eq(carreerCoursesTable.carreer, carrersTable.id),
        )
        .groupBy(sql`${carrersTable.id}`);
    } catch (error) {
      console.error(error);
    }
  }
  async getCarreerData(idCarreer: string): Promise<Carreer | undefined> {
    try {
      const carreerData = await this.dbClient.transaction(async (tx) => {
        const result = await tx
          .select({
            name: carrersTable.name,
            description: carrersTable.description,
            id: carrersTable.id,
            totalCourses: count(carreerCoursesTable.courses),
            approved:
              sql`SUM(CASE WHEN ${takedCoursesTable.status} = 'completed' THEN 1 ELSE 0 END)`,
          })
          .from(carrersTable)
          .leftJoin(
            takedCoursesTable,
            eq(carrersTable.id, takedCoursesTable.carreer),
          )
          .innerJoin(
            carreerCoursesTable,
            eq(carreerCoursesTable.carreer, carrersTable.id),
          )
          .groupBy(sql`${carrersTable.id}`)
          .where(eq(carrersTable.id, idCarreer));
        if (result.length === 0) {
          throw new Error("Carreer not found");
        }
        const carreer = result[0];
        const courses = await tx.query.carreerCoursesTable.findMany({
          with: {
            correlatives: true,
            courses:true;
          },
          where: (carreerCoursesTable,{eq})=> eq(carreerCoursesTable.carreer,idCarreer)
        })
        carreer.courses = courses;
        const takedCourses = await tx.select().from(takedCoursesTable).where(
          eq(takedCoursesTable.carreer, idCarreer),
        );
        carreer.takedCourses = takedCourses;
        return carreer;
      });
      return carreerData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getCarreerCourses(idCarreer: string) {
    try {
      return await this.dbClient
        .select({
          id: coursesTable.id,
          name: coursesTable.name,
          description: coursesTable.description,
          periodDuration: periodCoursesTable.description,
        })
        .from(carrersTable)
        .innerJoin(
          carreerCoursesTable,
          eq(carrersTable.id, carreerCoursesTable.carreer),
        )
        .innerJoin(
          coursesTable,
          eq(coursesTable.id, carreerCoursesTable.courses),
        )
        .innerJoin(
          periodCoursesTable,
          eq(periodCoursesTable.id, coursesTable.id),
        )
        .where(eq(carrersTable.id, idCarreer));
    } catch (error) {
      console.error(error);
    }
  }
  async addNewCarrer(carreerData: NewCarreer) {
    try {
      if (carreerData.courses.length === 0) {
        throw new Error("Courses array must have at least one course");
      }
      return await this.dbClient.transaction(async (tx) => {
        const res = await tx
          .insert(carrersTable)
          .values({
            name: carreerData.name,
            description: carreerData.description,
          })
          .returning({ id: carrersTable.id });
        await tx.insert(carreerCoursesTable).values(
          carreerData.courses.map((course) => ({
            carreer: res[0].id,
            courses: course,
          })),
        );
        return res[0];
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteCarreer(idCarreer: string) {
    try {
      return await this.dbClient
        .delete(carrersTable)
        .where(eq(carrersTable.id, idCarreer))
        .returning({ id: carrersTable.id });
    } catch (error) {
      console.error(error);
    }
  }
  async updateCarreer(
    idCarreer: string,
    carreerData: NewCarreer,
  ): Promise<Carreer | undefined> {
    let res = undefined;
    await this.dbClient.transaction(async (tx) => {
      res = (
        await tx
          .update(carrersTable)
          .set({
            name: carreerData.name,
            description: carreerData.description,
          })
          .where(eq(carrersTable.id, idCarreer))
      ).toJSON();
      const currentCourses = await tx
        .select({
          course: carreerCoursesTable.courses,
        })
        .from(carreerCoursesTable)
        .where(eq(carreerCoursesTable.carreer, idCarreer));

      const coursesToDelete = currentCourses.filter(
        (course) => !carreerData.courses.includes(course.course),
      );

      if (coursesToDelete.length > 0) {
        await tx.delete(carreerCoursesTable).where(
          and(
            eq(carreerCoursesTable.carreer, idCarreer),
            inArray(
              carreerCoursesTable.courses,
              coursesToDelete.map((course) => course.course),
            ),
          ),
        );
      }
      const carrersToAdd = carreerData.courses.filter(
        (course) => !currentCourses.includes({ course }),
      );
      if (carrersToAdd.length > 0) {
        await tx.insert(carreerCoursesTable).values(
          carrersToAdd.map((course) => ({
            carreer: idCarreer,
            courses: course,
          })),
        );
      }
    });
    return res;
  }

  async loadCarreerWithCSV(file: File) {}
}
