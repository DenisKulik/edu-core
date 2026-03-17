import { Router } from "express";
import { AuthController } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";
import { validationMiddleware } from "../../middlewares";

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
