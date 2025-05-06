import { primaryKey, sqliteTable, text,integer } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm/table";
import { carrersTable } from "./carreers.ts";

// === COURSES SCHEMA ===
export const coursesTable = sqliteTable("courses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  year: integer("year").notNull(),
  description: text("description"),
  period: text("period").notNull().references(() => periodCoursesTable.id, {
    onDelete: "cascade",
  }),
});

// === Courses Period SCHEMA ===
export const periodCoursesTable = sqliteTable("period_courses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  description: text("description"),
});

// === Courses Correlatives SCHEMA ===
export const courseCorrelativesTable = sqliteTable("course_correlatives", {
  course: text("course").notNull().references(() => coursesTable.id, {
    onDelete: "cascade",
  }),
  correlative: text("correlative").notNull().references(() => coursesTable.id, {
    onDelete: "cascade",
  }),
});

// === Taked Courses Schema ===
export const takedCoursesTable = sqliteTable("taked_courses", {
  course: text("course").notNull().references(() => coursesTable.id, {
    onDelete: "cascade",
  }),
  carreer: text("carreer").notNull().references(() => carrersTable.id, {
    onDelete: "cascade",
  }),
  startDate: text("date").notNull(),
  status: text("status").notNull(),
  professor: text("professor"),

},(table) => [primaryKey({ columns: [table.carreer, table.course,table.startDate] })])


export type Course = InferSelectModel<typeof coursesTable>;
export type PeriodCourses = InferSelectModel<typeof periodCoursesTable>;
export type CourseCorrelatives = InferSelectModel<typeof courseCorrelativesTable>;
export interface CourseWithCorrelatives extends Course {
  correlatives: string[];
}
