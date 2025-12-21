import { createTask ,deleteTask,findByUserId} from "./task.repo";
import { AppError} from "../../core/errors/Apperror";
import { tasks } from "../../config/db/schema/tasks";
import { updateTask } from "./task.repo";
import { eq } from "drizzle-orm";
interface createTaskInput{
  title:string,
  description:string,
  priority?:string;
}
//create
export async function createTaskService(
  userId:string,
  data:createTaskInput
){
  if(!data.title || !data.description)
  {
    throw new AppError("Validation error","Title and Description required",400);
  }
  return await createTask({
    ...data,
    userId
  })
}
//read
export async function getTasksService(userId:string){

  return await findByUserId(userId);
}

export async function getTaskByIdService(taskId:string,userId:string)
{
  const task=await findByUserId(userId);

  if(!task)
  {
  throw new AppError("Forbidden","Task not found",403);
  }
if(task.userId !== userId)
{
  throw new AppError("Forbidden","you do not own this task",403)
}

  return task;
}

export async function updateTaskService(taskId:string,userId:string,data:any)
{
const task=await updateTask(taskId,userId,data);

if(!task)
{
  throw new AppError( "NotFound", "Task not Found", 404 )
}

return task;
}

export async function deleteTaskService(taskId:string,userId:string){

const del_task=await deleteTask(taskId,userId);

if(del_task.rowCount==0)
{
  throw new AppError("NotFound","TaskNotFound",404);
}
return del_task;
}