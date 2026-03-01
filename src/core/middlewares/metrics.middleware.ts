import { requestCounter,requestDuration} from '../../metrics'
import { Request, Response, NextFunction } from 'express';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    requestCounter.inc();
    requestDuration.observe(Date.now() - start);
  });
  next();
};