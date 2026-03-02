import { Request,Response,NextFunction } from "express";
import { getAllUsers,updateUserById,deleteUserById, UpdateUserRole } from "./auth.repo";
import { AppError } from "../../core/errors/Apperror";


export async function getUsersController(
   req:Request,
  res:Response,
  next:NextFunction
){
try{
const users=await getAllUsers()
 res.json(users)
}catch(err)
{
  next(err);
}
}


export async function updateUserController(
  req:Request,
  res:Response,
  next:NextFunction
){
  try {
    const userId=req.params.id;
    const result=await updateUserById(userId,req.body);

    res.json({
      message:"User updated",
      user:result,
    })

  } catch (err) {
    next(err);
  }
}

export async function deleteUserController(
   req:Request,
  res:Response,
  next:NextFunction
){
  try{
    await deleteUserById(req.params.id);
    res.json({
      message:"user deleted"
    })
  }catch(err)
  {
    next(err)
  }
}

export async function updateUserRoleController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await UpdateUserRole(id, role);

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
}