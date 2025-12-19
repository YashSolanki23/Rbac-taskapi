import { db } from "../../config/db/db";
import { eq,and } from "drizzle-orm";
import { tasks } from "../../config/db/schema/tasks";

export async function createTask(data:{
  title:string,
  description?:string,
  userId:string
}){
return await db.insert(tasks).values(data).returning();
}

export async function findByUserId(userId:string) {
  return await db.select().from(tasks).where(eq(tasks.userId,userId));
}


export async function getTaskbyId(id:string,userId:string){

return await db.select().from(tasks).where(and(eq(tasks.id,id),eq(tasks.userId,userId)))
}

export async function updateTask(id:string,userId:string,data:any){

  return await db.update(tasks).set(data).where(and(eq(tasks.id,id),eq(tasks.userId,userId)))
}

export async function deleteTask(id:string ,userId:string){
  return await db.delete(tasks).where(and(eq(tasks.id,id),eq(tasks.userId,userId)))
}