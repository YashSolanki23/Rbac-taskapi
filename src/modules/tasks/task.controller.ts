import { Request,Response,NextFunction } from "express";
import { createTaskService } from "./task.service";
import { createTaskSchema } from "./tasks.schema";
import { db } from "../../config/db/db";
import { createTask, findByUserId, getTaskbyId } from "./task.repo";

export async function createTaskController(
  req:Request,
  res:Response,
  next:NextFunction,
){
  try {
    const userId=(req as any).user.id;
    const [task]=await createTask({...req.body,userId})
    res.status(201).json(task);
    } catch (err) {
    next(err);
  }
}


export async function getTasksController(
req:Request,
  res:Response,
  next:NextFunction,
){
try {
   const userId=(req as any).user.id;
   const tasks=await findByUserId(userId);
   res.json(tasks);
} catch (err) {
  next(err)
}
}
  
