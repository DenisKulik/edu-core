import { Request, Response, NextFunction } from "express";

export const requestDurationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  next();

  const end = Date.now();
  const duration = end - start;

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} - ${duration}ms`,
  );
};
