import { Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { Env } from "../../config/Env"; 
import { AppError } from "../errors/Apperror";

export function requireAuth(
  req:Request,
res:Response,
next:NextFunction
){
  const header=req.headers.authorization;

  if(!header)
  {
    return next(new AppError("unauthorized ","no token provided",401));
  }

  const [type,token]=header.split(" ");

  if(type!=="Bearer" || !token)
  {
  return next(new AppError("unauthorized","invalid auth format",401));
  }

  try {
    const payload=jwt.verify(token,Env.JWT_SECRET) as any;
    (req as any).user={id:payload.sub ,role:payload.role};
    next();
  } catch {
    return next(new AppError("unauthorized","Expired or invalid token",401));
  }
}