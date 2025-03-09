import { NewCarreer } from "../models/carreers.ts";
import type { DBClient } from "../db/dbController.ts";
import {
  Carreer,
  carreerCoursesTable,
  carrersTable,
} from "../db/libsql/schemas/carreers.ts";
import {
  coursesTable,
  periodCoursesTable,
} from "../db/libsql/schemas/courses.ts";
import { eq } from "drizzle-orm/expressions";

export class CarreerService {
  // TODO: add dbclient to the constructor
  private dbClient: DBClient;
  constructor(dbClient: DBClient) {
    this.dbClient = dbClient;
  }
  async getCarreers() {
    try {
      return await this.dbClient.select().from(carrersTable);
    } catch (error) {
      console.error(error);
    }
  }
  async getCarreerData(idCarreer: string): Promise<Carreer | undefined> {
    try {
      return (await this.dbClient
        .select()
        .from(carrersTable)
        .where(eq(carrersTable.id, idCarreer)))[0];
    } catch (error) {
      console.error(error);
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
        .from(carrersTable).innerJoin(
          carreerCoursesTable,
          eq(carrersTable.id, carreerCoursesTable.carreer),
        ).innerJoin(
          coursesTable,
          eq(coursesTable.id, carreerCoursesTable.courses),
        ).innerJoin(
          periodCoursesTable,
          eq(periodCoursesTable.id, coursesTable.id),
        ).where(eq(carrersTable.id, idCarreer));
    } catch (error) {
      console.error(error);
    }
  }
  async addNewCarrer(carreerData: NewCarreer) {
    try {
      const res = await this.dbClient.insert(carrersTable).values({
        name: carreerData.name,
        description: carreerData.description,
      }).returning({ id: carrersTable.id });
      await this.dbClient.insert(carreerCoursesTable).values(
        carreerData.correlativesCourses.map((course) => ({
          carreer: res[0].id,
          courses: course,
        })),
      );
      return res;
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCarreer(idCarreer: string) {
    try {
      await this.dbClient.delete(carrersTable).where(
        eq(carrersTable.id, idCarreer),
      );
    } catch (error) {
      console.error(error);
    }
  }
  async updateCarreer(idCarreer: string, carreerData: NewCarreer) {
    await this.dbClient.update(carrersTable).set({
      name: carreerData.name,
      description: carreerData.description,
    }).where(eq(carrersTable.id, idCarreer));
  }
  async loadCarreerWithCSV(file: File) {
  }
}
