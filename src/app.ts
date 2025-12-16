import express from "express";
import cors from "cors";
import { errorHandler } from "./core/errors/errorHandler";
import  authRoute from "./modules/auth/auth.routes"
import adminRoute from "./routes/admin-routes";

export function createApp() {
 
  const app = express();

  app.use(cors());
 app.use(express.json());
  app.get("/api/health", (req, res) => {
    res.json({ health: "ok" });
  });

app.use("/auth",authRoute)
app.use("/admin",adminRoute);
app.use(errorHandler)

  return app;
}
