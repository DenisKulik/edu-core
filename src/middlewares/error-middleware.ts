import { Request, Response, NextFunction } from "express";
import { HttpStatuses } from "../types";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Server error:", err);

  res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
};
