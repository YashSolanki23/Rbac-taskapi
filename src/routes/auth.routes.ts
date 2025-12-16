import { Router } from "express";
import { loginController,registerController,refreshController} from "./auth.controller";
import { validate } from "../../core/middlewares/validate.middleware";
import { registerSchema,loginSchema,refreshSchema } from "./auth.schema";
import { requireAuth } from "../../core/middlewares/auth.middleware";
const authRoute=Router();
//public routes
authRoute.post("/register",validate(registerSchema),registerController);
authRoute.post("/login",validate(loginSchema),loginController);
authRoute.post("/refresh",validate(refreshSchema),refreshController);

//private route
authRoute.get("/me",requireAuth,(req,res)=>{
  res.json({
    id:(req as any).user.id,
    role:(req as any).user.role,
  });
});

export default authRoute;