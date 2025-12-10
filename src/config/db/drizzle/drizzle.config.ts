import { defineConfig } from "drizzle-kit";
import {dotenv} from "dotenv"

export default defineConfig({
schema: "./src/config/db/schema/*.ts", 
  out: "./src/config/db/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
