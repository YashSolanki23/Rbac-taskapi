import { pgTable,uuid,varchar,timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const tasks=pgTable("tasks",{
id:uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
title:varchar("title",{length:255}).notNull(),
description:varchar("description",{length:500}),
status:varchar("status",{length:20}).notNull().default("todo"),
priority:varchar("priority",{length:20}).notNull().default("medium"),
userId:uuid("user_id").notNull().references(()=>users.id,{onDelete:"cascade"}),
createdAt:timestamp("created_At").defaultNow(),
updatedAt:timestamp("updated_At").defaultNow()
});