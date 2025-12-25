import { Router } from "express";
import { requireAuth } from "../core/middlewares/auth.middleware";
import { requireAdmin } from "../core/middlewares/admin.middleware";
import { deleteUserController, getUsersController, updateUserController, updateUserRoleController } from "../modules/auth/admin.controller";

const adminRoute=Router();

adminRoute.use(requireAuth,requireAdmin)

adminRoute.get("/users",getUsersController);
adminRoute.patch("/users/:id",updateUserController)
adminRoute.patch("/users/:id/:role",updateUserRoleController)
adminRoute.delete("/users/:id",deleteUserController);

export default adminRoute;