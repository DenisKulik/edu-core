import { Router } from "express";
import { UsersService } from "../domain";
import { HttpStatuses, UserDBType } from "../types";
import { JwtService } from "../application";

export const getAuthRouter = () => {
  const router = Router();
  const userService = new UsersService();
  const jwtService = new JwtService();

  router.post("/register", async (req, res) => {
    const user: UserDBType = await userService.createUser(
      req.body.login,
      req.body.email,
      req.body.password,
    );

    if (user) {
      res.status(HttpStatuses.CREATED).send({ message: "Success" });
    } else {
      res.status(HttpStatuses.BAD_REQUEST).json({ message: "Bad request" });
    }
  });

  router.post("/login", async (req, res) => {
    const user = await userService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password,
    );

    if (user) {
      const token = await jwtService.createJWT(user);
      res.status(HttpStatuses.CREATED).send({ message: "Success", token });
    } else {
      res.status(HttpStatuses.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
  });

  return router;
};
