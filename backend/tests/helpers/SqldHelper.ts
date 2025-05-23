import { LibSQLClient } from "../../src/db/libsql/db.ts";
import { coursesTable, periodCoursesTable } from "../../src/db/libsql/schemas/courses.ts";
import { coursesTestFixture } from "../fixtures/courses.ts";

export async function insertTestDataCourses(db:LibSQLClient ){
  try{
    await db.insert(coursesTable).values(coursesTestFixture)
  } catch (error) {
    console.error("Error inserting test data into courses table:", error);
    throw error;
  }
}

export async function insertPeriod(db:LibSQLClient){
  try{
    await db.insert(periodCoursesTable).values([{
      id:"0",
      "description":"CUATRIMESTRAL",
    },{
      id:"1",
      "description":"ANUAL",
    }])
  } catch (error) {
    console.error("Error inserting test data into courses table:", error);
    throw error;
  }

}