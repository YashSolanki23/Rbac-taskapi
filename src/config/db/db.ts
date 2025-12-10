import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

const queryClient = neon(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);
