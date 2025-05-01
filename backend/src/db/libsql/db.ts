import { createClient } from "npm:@libsql/client/node";
import { drizzle } from "drizzle-orm/libsql";
import { dbModeByEnv } from "../../utils/mode.util.ts";
import { pushSQLiteSchema } from "drizzle-kit/api";
import { courseCorrelativesRelation, coursesRelations, periodCoursesTable } from "./schemas/courses.ts";
import { coursesTable } from "./schemas/courses.ts";
import { courseCorrelativesTable } from "./schemas/courses.ts";
import { carreerCoursesTable, carrersTable } from "./schemas/carreers.ts";
const client = createClient({
  url: dbModeByEnv(),
});
export const db = drizzle(client, {
  schema: {
    coursesTable,
    courseCorrelativesTable,
    carreerCoursesTable,
    carrersTable,
    periodCoursesTable,
    coursesRelations,
    courseCorrelativesRelation,
  },
  
});
export type LibSQLClient = typeof db;

if (Deno.env.get("TEST_MODE") === "true" || Deno.env.get("DOCKER") === "true") {
  try {
    await pushSQLiteSchema(
      {
        periodCoursesTable,
        coursesTable,
        courseCorrelativesTable,
        carreerCoursesTable,
        carrersTable,
      },
      db
    );
  } catch (error) {
    console.error("Error pushing schema to LibSQL:", error);
  }
}
