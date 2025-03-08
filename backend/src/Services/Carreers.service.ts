import { NewCarreer } from "../models/carreers.ts";
import type { DBClient } from "../db/dbController.ts";
import { carrersTable } from "../db/libsql/schemas/carreers.ts";
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
  async getCarreerData(idCarreer: string) {
    try {
      return await this.dbClient
        .select()
        .from(carrersTable)
        .where(eq(carrersTable.id, idCarreer))
        .get();
    } catch (error) {
      console.error(error);
    }
  }
  async getCarreerCourses(idCarreer: string) {
  }
  async addNewCarrer(carreerData: NewCarreer) {}
  async loadCarreerWithCSV(file: File) {
  }
}
