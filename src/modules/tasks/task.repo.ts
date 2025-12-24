import { db } from "../../config/db/db";
import { eq,and, ilike,or } from "drizzle-orm";
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

const update=await db.update(tasks).set({...data,updatedAt:new Date()}).where(and(eq(tasks.id,id),eq(tasks.userId,userId))).returning()

  return update[0];
}

export async function deleteTask(id:string ,userId:string){

 const [delete_task]=await db.delete(tasks).where(and(eq(tasks.id,id),eq(tasks.userId,userId))).returning()

 return delete_task

}

export async function getTasksAdvanced({
  userId,
  search,
  status,
  priority,
  page=1,
  limit=10,
  sortBy="createdAt",
  order= "desc",
}:{
  userId:string,
  search?:string,
  status?:string,
  priority?:string,
  page?:number,
  limit?:number,
  sortBy?: "createdAt" | "updatedAt" | "title",
  order?: "asc" | "desc"
}){
const conditions =[eq(tasks.userId,userId)];

if(search){
  conditions.push(
    or(
      ilike(tasks.title,`%${search}%`),
      ilike(tasks.description,`%${search}%`)
    )
  )
}

if(status)
{
  conditions.push(eq(tasks.status,status))
}

if(priority)
{
  conditions.push(eq(tasks.priority,priority))
}

const offset=(page-1)*limit

return db.select().from(tasks).where(and(...conditions))
.orderBy(
  order === "asc" ? asc(tasks[sortBy]) : desc(tasks[sortBy])
).limit(limit)
.offset(offset)


}