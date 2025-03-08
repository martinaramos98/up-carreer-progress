import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
const client = createClient({
  url: Deno.env.get("DATABASE_URL"),
});
export const db = drizzle(client);
export type LibSQLClient = typeof db;
