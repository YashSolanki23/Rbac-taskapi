import { Request,Response } from "express";
import { createTaskService } from "./task.service";
import { createTaskSchema } from "./tasks.schema";
import { db } from "../../config/db/db";

export async function createTaskController(req:Request,res:Response)
{
const input=createTaskSchema.parse(req.body);

const user=(req as any).user;

const [task]=await db
.insert(tasks)
.values({
  title:input.title,
  description:input.description,
  userId:user.id,
})
.returning()

  res.status(201).json(task);
}