import { NextFunction, Request, Response } from "express";
import { HttpStatuses } from "../types";
import { JwtService } from "../modules/auth";
import { UsersRepository, UsersService } from "../modules/users";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    res.sendStatus(HttpStatuses.UNAUTHORIZED);
    return;
  }

  const jwtService = new JwtService();

  const token = req.headers.authorization.split(" ")[1]; // Bearer token
  const userId = await jwtService.getUserIdByToken(token);

  if (userId) {
    const usersRepository = new UsersRepository();
    const usersService = new UsersService(usersRepository);
    const user = await usersService.findUserById(userId);

    req.user = user || undefined;
    return next();
  }

  res.sendStatus(HttpStatuses.UNAUTHORIZED);
};
