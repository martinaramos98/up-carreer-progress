import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export type Tables = 'carreerCoursesTable' | 'coursesTable' | 'courseCorrelativesTable' | 'carrersTable' | 'takedCoursesTable'; ;

export function carreerRelations(tables: Record<Tables,SQLiteTableWithColumns<any>>){

  const carrerCoursesRelation = relations(tables.carreerCoursesTable, ({ one }) => ({
  courses: one(tables.coursesTable,{
    relationName:"carreerCourses",
    fields: [tables.carreerCoursesTable.courses],
    references: [tables.coursesTable.id],
    
  }),
  carreer: one(tables.carrersTable, {
    fields: [tables.carreerCoursesTable.carreer],
    references: [tables.carrersTable.id],
    relationName:"carreer"
  }),
}))

// === Courses Correlatives RELATIONS ===
const courseCorrelativesRelation = relations(tables.courseCorrelativesTable, ({one}) => { 
  return {
    course: one(tables.coursesTable, {
      fields: [tables.courseCorrelativesTable.course],
      references: [tables.coursesTable.id],
      relationName:"correlatives"
    }),
    correlative: one(tables.coursesTable, {
      fields: [tables.courseCorrelativesTable.correlative],
      references: [tables.coursesTable.id],
      relationName:"courses"
    }),
  }
 })


const coursesRelations =  relations(tables.coursesTable, ({ many })=> ({
  carreers: many(tables.carreerCoursesTable),
  correlatives: many(tables.courseCorrelativesTable, {
    relationName: 'correlatives',
  }),
  courses: many(tables.courseCorrelativesTable, {
    relationName: 'courses',
  }),
  takedCourses: many(tables.takedCoursesTable, {
    relationName: 'takedCourses',
  }),
}))

const carreerRelations = relations(tables.carrersTable, ({ many }) => ({
  courses: many(tables.carreerCoursesTable),
}))

const takedCoursesRelation = relations(tables.takedCoursesTable, ({ one }) => ({
  course: one(tables.coursesTable, {
    fields: [tables.takedCoursesTable.course],
    references: [tables.coursesTable.id],
    relationName:"takedCourses"
  }),
  carreer: one(tables.carrersTable, {
    fields: [tables.takedCoursesTable.carreer],
    references: [tables.carrersTable.id],
    relationName:"takedCoursesCarreer"
  }),
}))

  return {
    courseCorrelativesRelation,
    carrerCoursesRelation,
    coursesRelations,
    carreerRelations,
    takedCoursesRelation
  }
}