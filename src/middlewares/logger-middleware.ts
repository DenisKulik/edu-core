import { Request, Response, NextFunction } from "express";
import { writeLog } from "../utils/file-logger";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const logMessage = `${req.method} ${req.url}`;
  writeLog(logMessage);

  next();
};
