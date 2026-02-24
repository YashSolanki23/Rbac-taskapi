import {Request,Response,NextFunction}  from "express"
import { AppError } from "./Apperror";

export function errorHandler(
  err:Error,
  _req:Request,
  res:Response,
  _next:NextFunction
){
   if(err instanceof AppError)
   {
    return res.status(err.statusCode).json({
      error:err.type,
      message:err.message
    })
   }
   return res.status(500).json({
    error:"InternalServerError",
    message:"Somethingwentwrong"
   });
};