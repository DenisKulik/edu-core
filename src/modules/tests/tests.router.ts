import { Router } from "express";
import { TestsController } from "./tests.controller";

export const getTestsRouter = (controller: TestsController) => {
  const router = Router();

  router.delete("/data", controller.deleteAllCourses.bind(controller));

  return router;
};
