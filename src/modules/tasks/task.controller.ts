import { Request, Response, NextFunction } from "express";
import {
  createTaskService,
  getTasksService,
  getTaskByIdService,
  updateTaskService,
  deleteTaskService,
} from "./task.service";


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

    const task = await updateTaskService(taskId, userId, req.body);

    res.status(200).json({
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

    await deleteTaskService(taskId, userId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
