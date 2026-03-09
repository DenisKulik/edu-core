import { Router } from "express";
import fs from "fs";
import path from "path";
import { HttpStatuses } from "../types";

export const getLogsRouter = () => {
  const router = Router();

  router.get("/", (req, res) => {
    const logPath = path.join(process.cwd(), "logs", "access.log");

    if (!fs.existsSync(logPath)) {
      res.sendStatus(HttpStatuses.NOT_FOUND);
      return;
    }

    res.type("text/plain");

    const stream = fs.createReadStream(logPath);

    stream.on("error", () => {
      res.sendStatus(HttpStatuses.INTERNAL_SERVER_ERROR);
    });

    stream.pipe(res);
  });

  return router;
};
