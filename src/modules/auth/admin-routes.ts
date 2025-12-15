import { Router } from "express";
import { requireAuth } from "../../core/middlewares/auth.middleware";
import { requireRole } from "../../core/middlewares/requireRole.middleware";

const adminRoute=Router();

adminRoute.get("/dashboard",requireAuth,requireRole("admin"),(req,res)=>{
  res.json({
    message:"welcome admin",
    userId:(req as any).user,
  });
}
);
export default adminRoute;