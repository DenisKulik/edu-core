import { Router } from "express";
import { AuthController } from "./auth.controller";

export const getAuthRouter = (controller: AuthController) => {
  const router = Router();

  router.post("/login", controller.login.bind(controller));
  router.post("/register", controller.register.bind(controller));

  return router;
};
