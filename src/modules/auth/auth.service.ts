import { hashPassword,verifyPassword } from "../password.service"
import { findUserByEmail,createUser } from "./auth.repo"
import { AppError } from "../../core/errors/Apperror"
import { generateAccessToken,generateRefreshToken,verifyRefreshToken } from "../token.service"
import { RegisterInput,LoginInput } from "./auth.types"


export async function register(input:RegisterInput)
{
  const existing=await findUserByEmail(input.email);

  if(existing)
  {
    throw new AppError("Email exists","Email already registered",400)
  }
  const hashedpassword=await hashPassword(input.password);


  const user=await createUser({
    email:input.email,
    passwordHash:hashedpassword
  });

  return {
    id:user?.id,
    email:user?.email,
  }
}

export async function login(input:LoginInput)
{
  const user=await findUserByEmail(input.email)
  
  if(!user)
  {
    throw new AppError("InvalidCredentials","Invalid email or password",401)
  }

  const verify=await verifyPassword(input.password,user.passwordHash);

  if(!verify)
  {
    throw new AppError("InvalidCredentials","Invalid email or password",401)
  }

  return {
    accessToken:generateAccessToken(user.id,user.role),
    refreshToken:generateRefreshToken(user.id)
  }
 
};

export async function refresh(token:string)
{
  const userid=verifyRefreshToken(token);


  return {
    accessToken:generateAccessToken(userid,"user")
  }
}
