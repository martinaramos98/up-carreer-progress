import { createClient } from "npm:@libsql/client/node";
import { drizzle } from "drizzle-orm/libsql";
import { dbModeByEnv } from "../../utils/mode.util.ts";
import { pushSQLiteSchema } from "drizzle-kit/api";
import { periodCoursesTable } from "./schemas/courses.ts";
import { courseCorrelativesTable,coursesTable, takedCoursesTable } from "./schemas/courses.ts";
import { carreerCoursesTable, carrersTable } from "./schemas/carreers.ts";
import { carreerRelations } from "./schemas/relations.ts";
import { insertPeriod, insertTestDataCourses } from "../../../tests/helpers/SqldHelper.ts";
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
    takedCoursesTable,
    ...carreerRelations({
      coursesTable,
      carreerCoursesTable,
      carrersTable,
      courseCorrelativesTable,
      takedCoursesTable,
    })
  },
  
});
export type LibSQLClient = typeof db;

if (Deno.env.get("TEST_MODE") === "true" || Deno.env.get("DOCKER") === "true") {
  try {
    const result = await pushSQLiteSchema(
      {
        coursesTable,
        courseCorrelativesTable,
        carreerCoursesTable,
        carrersTable,
        periodCoursesTable,
        takedCoursesTable,
        ...carreerRelations({
          coursesTable,
          carreerCoursesTable,
          carrersTable,
          courseCorrelativesTable,
          takedCoursesTable,
        })},
      db
    );
    await result.apply()
    if(Deno.env.get("TEST_MODE") === "true"){
      await insertPeriod(db);
      await insertTestDataCourses(db);
       console.log("READY_FOR_TEST");
    } 
  } catch (error) {
    console.error("Error pushing schema to LibSQL:", error);
  }
}
