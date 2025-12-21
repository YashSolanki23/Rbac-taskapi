import { db } from "../../config/db/db";
import { eq,and } from "drizzle-orm";
import { tasks } from "../../config/db/schema/tasks";

export async function createTask(data:{
  title:string,
  description:string,
  priority?:string,
  userId:string
}){
const task= await db.insert(tasks).values(data).returning();

return task
}



export async function findByUserId(userId:string) {

  const task= await db.select().from(tasks).where(eq(tasks.userId,userId));
 
  return task
}


export async function getTaskbyId(id:string,userId:string){

  const task=await db.select().from(tasks).where(and(eq(tasks.id,id),eq(tasks.userId,userId)));

return task
}

export async function updateTask(id:string,userId:string,data:any){

const update=await db.update(tasks).set({...data,updatedAt:new Date()}).where(and(eq(tasks.id,id),eq(tasks.userId,userId)))

  return update;
}

export async function deleteTask(id:string ,userId:string){

  const delete_task= await db.delete(tasks).where(and(eq(tasks.id,id),eq(tasks.userId,userId)))

  return delete_task;
}
