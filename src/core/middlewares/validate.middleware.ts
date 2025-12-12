import { AnyZodObject } from "zod/v3";
import { Request,Response,NextFunction } from "express";

export function validate(schema:AnyZodObject){
  return (req:Request,res:Response,next:NextFunction)=>{
    try {
      req.body=schema.parse(req.body);
      next();
    } catch (err:any) {
      res.status(400).json({
        error:"ValidationError",
        message: err.errors
      });
    }
  };
}