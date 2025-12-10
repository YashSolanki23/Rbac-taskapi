
import { sql } from 'drizzle-orm';

import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
 
  id: uuid("id").primaryKey().default(sql.raw('gen_random_uuid()')), 
  

  email: varchar("email", { length: 255 }).notNull().unique(),
  

  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  
  
  role: varchar("role", { length: 32 }).notNull().default("user"),
  
  Created_At: timestamp("created_at").defaultNow(),
  Updated_At: timestamp("updated_at").defaultNow()
});