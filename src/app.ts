import express from "express";
import cors from "cors";
import { errorHandler } from "./core/errors/errorHandler";
import  authRoute from "./routes/auth.routes";
import adminRoute from "./routes/admin-routes";
import { rateLimiter } from "./core/middlewares/rateLimit.middleware";
import TaskRouter from "./routes/task.routes";
import timingMiddleware from "./core/middlewares/timingMiddleware";
import globalError from "./core/middlewares/globalerrorhandlerlogs";
import { uptime } from "process";
import { requestCounter, requestDuration, register } from "./metrics";
import { metricsMiddleware } from "./core/middlewares/metrics.middleware";


export function createApp() {

  const app = express();
  let requestCount=0;
  let errorCount=0;
 

  app.use(cors());
  app.use(express.json());

   app.use(globalError);

//prometheus metrics
app.use(metricsMiddleware);

//request error count basic
  app.use((req,res,next)=>{
    requestCount++;

  res.on("finish",()=>{
   
    if(res.statusCode >=400){
      errorCount++;
    }
  });

  next();
  })


  app.get("/metrics",async(req,res)=>{
    
    res.set("Content-Type",register.contentType);
    res.send(await register.metrics());
  });

  //health end point
  app.get("/api/health", (req, res) => {
    res.json({ 
      health: "ok",
      uptime: process.uptime(),
      timestamp:Date.now()

    });
  });

app.use(rateLimiter)
app.use("/auth",authRoute)
app.use("/admin",adminRoute);
app.use("/tasks",TaskRouter)
app.use(errorHandler)

  return app;
}
