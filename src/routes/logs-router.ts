import { Router } from "express";
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream";
import { HttpStatuses } from "../types";

export const getLogsRouter = () => {
  const router = Router();

  router.get("/archive/:date", (req, res) => {
    const { date } = req.params;
    const logDir = path.join(process.cwd(), "logs");
    const logPath = path.join(process.cwd(), "logs", `access-${date}.log`);

    if (!fs.existsSync(logDir)) {
      res
        .status(HttpStatuses.NOT_FOUND)
        .send("Directory 'logs' does not exist");
      return;
    }

    if (!fs.existsSync(logPath)) {
      res
        .status(HttpStatuses.NOT_FOUND)
        .send(`Log file for date ${date} not found`);
      return;
    }

    res.setHeader("Content-Type", "application/gzip");
    res.setHeader("Content-Disposition", "attachment; filename=logs.gz");

    const readStream = fs.createReadStream(logPath);
    const gzip = zlib.createGzip();

    pipeline(readStream, gzip, res, (err) => {
      if (err) {
        console.error("Pipeline failed", err);
        res
          .status(HttpStatuses.INTERNAL_SERVER_ERROR)
          .send("Failed to process logs");
      }
    });
  });

  return router;
};
