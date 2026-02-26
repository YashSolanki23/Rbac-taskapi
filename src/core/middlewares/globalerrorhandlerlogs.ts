import { Request, Response, NextFunction } from "express";

export default function globalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(
    JSON.stringify({
      level: "error",
      message: err.message,
      stack: err.stack,
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    })
  );

  res.status(500).json({
    error: "Internal server error",
  });
}