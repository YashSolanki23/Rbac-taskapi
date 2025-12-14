import { AnyZodObject } from "zod";
import { Request,Response,NextFunction } from "express";
console.log("validates middle ware running")
export function validate(schema:AnyZodObject){
  return (req:Request,res:Response,next:NextFunction)=>{
    try {
      console.log("middleware hit")
      console.log("body before",req.body)
      req.body=schema.parse(req.body);
    console.log("body after",req.body)
      next();
    } catch (error:any) {
      res.status(400).json({
        error:"ValidationError",
        message: error.errors
      });
    }
  };
}