import { db } from "../../config/db/db";
import { users } from "../../config/db/schema/users";
import { eq } from "drizzle-orm";

export async function findUserByEmail(email:string)
{
  return db.query.users.findFirst({
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