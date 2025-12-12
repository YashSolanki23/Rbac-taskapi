import { Router } from "express";
import { loginController,registerController,refreshController} from "./auth.controller";
import { validate } from "../../core/middlewares/validate.middleware";
import { registerSchema,loginSchema,refreshSchema } from "./auth.schema";
import { requireAuth } from "../../core/middlewares/auth.middleware";
const router=Router();
//public routes
router.post("/register",validate(registerSchema),registerController);
router.post("/login",validate(loginSchema),loginController);
router.post("/refresh",validate(refreshSchema),refreshController);

//private route
router.get("/me",requireAuth,(req,res)=>{
  res.json({
    id:(req as any).user.id,
    role:(req as any).user.role,
  });
});

export default router;