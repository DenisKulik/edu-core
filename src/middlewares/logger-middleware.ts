import { Request, Response, NextFunction } from "express";
import { writeLog } from "../utils";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.ip} ${req.url} ${res.statusCode} ${duration}ms`;
    writeLog(logMessage);
  });

  next();
};
