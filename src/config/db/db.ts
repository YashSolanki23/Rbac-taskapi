import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema/users";

config({ path: ".env" });

const queryClient = neon(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
