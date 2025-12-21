import { Router } from "express";
import { requireAuth } from "../core/middlewares/auth.middleware";
import { createTaskSchema } from "../modules/tasks/tasks.schema";
import { validate } from "../core/middlewares/validate.middleware";
import {
  listTasksController,
  getTaskController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../modules/tasks/task.controller"


const TaskRouter=Router();

TaskRouter.use(requireAuth)

TaskRouter.get("/", listTasksController);
TaskRouter.get("/:id", getTaskController);
TaskRouter.post("/",validate(createTaskSchema),createTaskController)
TaskRouter.patch("/:id", updateTaskController);
TaskRouter.delete("/:id", deleteTaskController);



export default TaskRouter