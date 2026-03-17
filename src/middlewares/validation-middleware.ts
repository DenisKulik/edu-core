import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { HttpStatuses } from "../types";

export const validationMiddleware =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(HttpStatuses.BAD_REQUEST).json({
        errors: result.error.issues,
      });
      return;
    }

    req.body = result.data;

    next();
  };
