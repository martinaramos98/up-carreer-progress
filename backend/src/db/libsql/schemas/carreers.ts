import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { coursesTable } from "./courses.ts";
import { InferSelectModel } from "drizzle-orm/table";

export const carrersTable = sqliteTable("carrers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  description: text("description"),
  startDate: text("start_date").notNull(),
});

export const carreerCoursesTable = sqliteTable("carreer_courses", {
  carreer: text("carreer").notNull().references(() => carrersTable.id, {
    onDelete: "cascade",
  }),
  courses: text("courses").notNull().references(() => coursesTable.id, {
    onDelete: "cascade",
  }),
}, (table) => [primaryKey({ columns: [table.carreer, table.courses] })]);


export type Carreer = InferSelectModel<typeof carrersTable>;
export type CarreerCourses = InferSelectModel<typeof carreerCoursesTable>;
