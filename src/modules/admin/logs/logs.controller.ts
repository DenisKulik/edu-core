import { Request, Response } from "express";
import { LogsService } from "./logs.service";
import { HttpStatuses } from "../../../types";

export class LogsController {
  constructor(private logsService: LogsService) {}

  async getLogsArchive(req: Request, res: Response): Promise<void> {
    const { date } = req.params;
    const logPath = await this.logsService.getLogFilePath(date);

    if (!logPath) {
      res.status(HttpStatuses.NOT_FOUND).json({
        error: `Log file for date ${date} not found`,
      });
      return;
    }

    res.setHeader("Content-Type", "application/gzip");
    res.setHeader("Content-Disposition", "attachment; filename=logs.gz");

    const archiveStream = await this.logsService.getLogsArchiveStream(date);

    if (!archiveStream) {
      res.status(HttpStatuses.NOT_FOUND).json({
        error: `Failed to create archive for date ${date}`,
      });
      return;
    }

    archiveStream.pipe(res);

    archiveStream.on("error", (err) => {
      console.error("Stream error:", err);
      if (!res.headersSent) {
        res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({
          error: "Failed to process logs",
        });
      }
    });
  }
}
