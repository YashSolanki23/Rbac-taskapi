import { Request,Response,NextFunction } from "express";
import { Authrequest } from "./auth.middleware";

export function requireRole(allowedRole: "user" | "admin")
{
  return (req:Authrequest,res:Response,next:NextFunction)=>{
    if(!req.user)
    {
      return res.status(401).json({error :"unauthorized"});
    }

    if(req.user.role !== allowedRole)
    {
      return res.status(403).json({error:"forbidden"});
    }

    next();
  };
}