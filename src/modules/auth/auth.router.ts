import { Router } from "express";
import { AuthController } from "./controllers/auth.controller";
import { validationMiddleware } from "../../middlewares";
import { loginSchema, registerSchema } from "../users";

export const getAuthRouter = (controller: AuthController) => {
  const router = Router();

  router.post(
    "/register",
    validationMiddleware(registerSchema),
    controller.register.bind(controller),
  );

  router.post(
    "/login",
    validationMiddleware(loginSchema),
    controller.login.bind(controller),
  );

  return router;
};
