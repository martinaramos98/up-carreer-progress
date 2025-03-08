import { LibSQLClient } from "./libsql/db.ts";
export async function loadDBClient(): Promise<DBClient> {
  if (Deno.env.get("ENTITY_DB") === "libsql") {
    return (await import("./libsql/db.ts")).db;
  }
  throw new Error("No database client selected");
}

export type DBClient = LibSQLClient;
