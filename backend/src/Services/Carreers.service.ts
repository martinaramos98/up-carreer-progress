import * as Sentry from "npm:@sentry/deno";
import { CarreerWithCourses, NewCarreer } from "../models/carreers.ts";
import type { DBClient } from "../db/dbController.ts";
import {
  Carreer,
  carreerCoursesTable,
  carrersTable,
} from "../db/libsql/schemas/carreers.ts";
import {CarreerCourse} from "../models/courses.ts"
import {
  takedCoursesTable,
} from "../db/libsql/schemas/courses.ts";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import { convertObjectToArrayCourse } from "../utils/convertions.util.ts";
export class CarreerService {
  // TODO: add dbclient to the constructor
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCarreers() {
    try {
      const result = await this.dbClient
        .select({
          name: carrersTable.name,
          description: carrersTable.description,
          id: carrersTable.id,
          startDate: carrersTable.startDate,
         
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
        await Promise.all(
          result.map(async (carreer) => {
            carreer.totalCourses = await this.getTotalCourses(carreer.id);
            carreer.approved = await this.getTotalApprovedCourses(carreer.id);

          })
        );
        return result;
    } catch (error) {
      console.error(error);
    }
  }
  async getCarreerData(idCarreer: string): Promise<CarreerWithCourses | undefined> {
    try {
      const timer = performance.now();
      let carreer: CarreerWithCourses | undefined = undefined;
      await Sentry.startSpan({
        name: "DB Carreer Grade",
        op: "db.metrics",
        attributes: {
          "db.query": "Select",
          "db.query.start": timer,

        },
      },
      async (span)=>{
      await this.dbClient.transaction(async (tx) => {
        const result = await tx
          .select({
            name: carrersTable.name,
            description: carrersTable.description,
            id: carrersTable.id,
            startDate: carrersTable.startDate,
            // totalCourses: count(carreerCoursesTable.courses),
            // approved:
              // sql`SUM(CASE WHEN ${takedCoursesTable.status} = 'completed' THEN 1 ELSE 0 END)`,
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
        span.setAttribute("db.query.result", result.length);
        carreer = result[0] as CarreerWithCourses;
        carreer.totalCourses = await this.getTotalCourses(idCarreer);
        carreer.approved = await this.getTotalApprovedCourses(idCarreer);
        const courses = await tx.query.carreerCoursesTable.findMany({
          where: eq(carreerCoursesTable.carreer,idCarreer),

          columns: {
            carreer: false,
            courses: true,
          },
          with: {
            courses: {
              with: {
                takedCourses:true,
                correlatives:{
                  columns: {
                    course:false,
                    correlative:true,
                  }
                },

              }
            }
          }
        })
        // FIXME: Change type for a builder pattern type
        // @ts-expect-error type
        carreer.courses = courses as CarreerCourse[];
        // @ts-expect-error type
        convertObjectToArrayCourse(carreer)
        this.buildCourseStatus(carreer)
      });
      span.setAttribute("db.query.end", performance.now());
      }

    )
      return carreer as unknown as CarreerWithCourses;
    } catch (error) {
      console.error(error);
      throw error;
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
            startDate: carreerData.startDate,
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
  private buildCourseStatus(carreer: CarreerWithCourses) {
    const coursesMap = new Map(carreer.courses.map((course: CarreerCourse) => [course.id, course]));  
    carreer.courses.forEach((course:CarreerCourse) => {
      course.status = course.takedCourses?.at(-1)?.status ?? "not started" 
      course.correlatives.forEach((correlative:string) => {
        const correlativesCoursesStatus = coursesMap.get(correlative)?.takedCourses?.at(-1)?.status ?? "not started" 
        if (correlativesCoursesStatus !== "completed" && correlativesCoursesStatus !== "exam pending") {
          course.status = "pending correlatives"
        }
      }
        
      )
    })
  }
  private async  getTotalCourses(carreerId: string) {
    try {
      const qr = await this.dbClient.select({
        totalCourses: count(carreerCoursesTable.courses),
      }).from(carreerCoursesTable).where(eq(carreerCoursesTable.carreer,carreerId))
      return qr[0].totalCourses;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting total courses");    
    }
    }
    private async  getTotalApprovedCourses(carreerId: string) {
      try {
        const qr = await this.dbClient.select({
          approved: count(takedCoursesTable.status),
        }).from(takedCoursesTable).where(and(eq(takedCoursesTable.carreer,carreerId), eq(takedCoursesTable.status,"completed")))
        return qr[0].approved;
      } catch (error) {
        console.error(error);
        throw new Error("Error getting approved courses");    
      }
      }
}
