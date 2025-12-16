import { Router } from "express";
import { requireAuth } from "../core/middlewares/auth.middleware";
import { requireAdmin } from "../core/middlewares/admin.middleware";

const adminRoute=Router();

adminRoute.use(requireAuth,requireAdmin)

adminRoute.get("/dashboard",requireAuth,requireRole("admin"),(req,res)=>{
  res.json({
    message:"welcome admin",
    userId:(req as any).user,
  });
}
);
export default adminRoute;