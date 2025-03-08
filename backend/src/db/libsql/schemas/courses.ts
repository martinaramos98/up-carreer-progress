import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm/table";
// === COURSES SCHEMA ===
export const coursesTable = sqliteTable("courses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
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

export type Courses = InferSelectModel<typeof coursesTable>;
export type PeriodCourses = InferSelectModel<typeof periodCoursesTable>;
