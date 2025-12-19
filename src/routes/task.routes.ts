import { Router } from "express";
import { requireAuth } from "../core/middlewares/auth.middleware";
import { createTaskSchema } from "../modules/tasks/tasks.schema";
import { validate } from "../core/middlewares/validate.middleware";
import { createTaskController } from "../modules/tasks/task.controller";

const TaskRouter=Router();

TaskRouter.use(requireAuth)
TaskRouter.post("/",validate(createTaskSchema),createTaskController);


export default TaskRouter