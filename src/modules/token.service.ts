import jwt from "jsonwebtoken"
import { Env } from "../config/Env";
import { AppError } from "../core/errors/Apperror";
export function generateAccessToken(userId:string,role:string)
{
  return jwt.sign({sub:userId,role},Env.JWT_SECRET,{expiresIn:"15m"});
}
export function generateRefreshToken(userId:string){
  return jwt.sign({sub:userId,type:"refresh"},process.Env.JWT_SECRET,{expiresIn:"7d"});
}

export function verifyRefreshToken(token:string)
{
try {
    const payload=jwt.verify(token,Env.JWT_SECRET) as any;

  if(!payload)
  {
    throw new AppError("Invalid Token","Not a refresh token",401);
  }

  return payload.sub;
  
} 
catch  {
  
  throw new AppError("Invalid Token","RefreshToken is invalid or expired",401);
}


}