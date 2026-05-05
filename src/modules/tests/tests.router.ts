import { Router } from "express";
import { TestsController } from "./controllers/tests.controller";

export const getTestsRouter = (controller: TestsController) => {
  const router = Router();

  router.delete("/data", controller.deleteAllCourses.bind(controller));

  return router;
};
