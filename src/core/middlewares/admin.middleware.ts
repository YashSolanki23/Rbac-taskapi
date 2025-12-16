import { Response,Request,NextFunction } from "express";
import { AppError} from "../errors/Apperror";

export function requireAdmin(
req:Request,
res:Response,
next:NextFunction
){
const user=(req as any).user;

if(!user || user.role!== "admin")
{
  return next(new AppError("Forbidden","Admin access only",403));
}

next()
}