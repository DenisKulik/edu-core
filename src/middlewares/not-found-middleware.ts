import { Request, Response } from "express";
import { HttpStatuses } from "../types";

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(HttpStatuses.NOT_FOUND).json({
    message: "Route not found",
  });
};
