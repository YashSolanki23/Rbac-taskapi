import { db } from "../../config/db/db";
import { users } from "../../config/db/schema/users";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email:string)
{
  return await db.query.users.findFirst({
    where:eq(users.email,email),
  })
}

export async function createUser(data:{
  email:string,
  passwordHash:string,
  role?:string
}){
  const [user]=await db.insert(users).values(data).returning();

  return user;
}
export async function getAllUsers(){

  return db.query.users.findMany({
    columns:{
      id:true,
      email:true,
      role:true,
      Created_At:true
    }
  })
  
}

export async function updateUserById(
  id:string,
  data:Partial<{email:string,role:string}>
){
  const [user]=await db
  .update(users)
  .set(data)
  .where(eq(users.id,id))
  .returning();

  return user;
}

export async function deleteUserById(id:string)
{
  await db.delete(users).where(eq(users.id,id));
}


export async function UpdateUserRole(req:Request,res:Response)
{
   const {id}=req.params;
    const {role}=req.body;

   const userinfo= await db.update(users).set({role}).where(eq(users.id,id));
 
    return res.send({
      status:"user role updated",
      msg:userinfo
    });
}