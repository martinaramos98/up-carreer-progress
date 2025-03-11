import { LibSQLClient } from "./libsql/db.ts";
import process from "node:process";
export async function loadDBClient(): Promise<DBClient> {
  if (process.env.ENTITY_DB === "libsql") {
    return (await import("./libsql/db.ts")).db;
  }
  throw new Error("No database client selected");
}

export type DBClient = LibSQLClient;
