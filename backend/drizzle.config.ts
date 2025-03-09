import { defineConfig } from "drizzle-kit";
import process from "node:process";
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/libsql/schemas",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "http://127.0.0.1:8080",
  },
});
