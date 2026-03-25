import { Router } from "express";
import { LogsController } from "./logs.controller";

export const getLogsRouter = (controller: LogsController) => {
  const router = Router();

  router.get("/archive/:date", controller.getLogsArchive.bind(controller));

  return router;
};
