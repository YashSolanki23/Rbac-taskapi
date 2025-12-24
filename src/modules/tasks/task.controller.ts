import { Request, Response, NextFunction } from "express";
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
  getTasksAdvancedService,
} from "./task.service";
import { AppError } from "../../core/errors/Apperror";

export async function createTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id; 
    const task = await createTaskService(userId, req.body);

    res.status(201).json({
      message: "Task created",
      data: task,
    });
  } catch (err) {
    next(err);
  }
}


export async function listTasksController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const tasks = await getTasksService(userId);

    res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}


export async function getTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;
    const taskId = req.params.id;

    const task = await getTaskByIdService(taskId, userId);

    res.status(200).json({
      data: task,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
console.log("TASK ID PARAM:", req.params.id);
console.log("USER ID FROM TOKEN:", req.user.id);

    const task = await updateTaskService(taskId, userId, req.body);

if (!task) {
    throw new AppError("NotFound", "Task not Found", 404);
  }

    return res.status(200).json({
      message: "Task updated",
      data: task,
    });
  } catch (err) {
    next(err);
  }
}


export async function deleteTaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

const deletedTask= await deleteTaskService(taskId, userId);


  if (!deletedTask) {
    throw new AppError("NotFound", "Task not Found", 404);
  }

    res.json({
     message:"task deleted"
    })
  } catch (err) {
    next(err);
  }
}


export async function getTasksAdvancedController(
  req:Request,
  res:Response,
  next:NextFunction
){

  try {
    const userId = (req as any).user.id

    const tasks=await getTasksAdvancedService(userId,{
      search: req.query.search as string,
      status: req.query.status as string,
      priority: req.query.priority as string,
      page:Number(req.query.page) || 1,
      limit:Number(req.query.limit) || 10,
      sortBy: req.query.sortBy as any,
      order: req.query.order as any
    });

    res.json(tasks)

  } catch (err) {
    next(err)
  }
}