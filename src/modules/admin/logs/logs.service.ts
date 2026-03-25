import path from "path";
import fs from "fs";
import zlib from "zlib";
import { Readable } from "stream";

export interface ILogsService {
  getLogFilePath(date: string): Promise<string | null>;
  getLogsArchiveStream(date: string): Promise<Readable | null>;
}

export class LogsService implements ILogsService {
  private logDir: string;

  constructor() {
    this.logDir = path.join(process.cwd(), "logs");
  }

  async getLogFilePath(date: string): Promise<string | null> {
    if (!fs.existsSync(this.logDir)) {
      return null;
    }

    const logPath = path.join(this.logDir, `access-${date}.log`);

    if (!fs.existsSync(logPath)) {
      return null;
    }

    return logPath;
  }

  async getLogsArchiveStream(date: string): Promise<Readable | null> {
    const logPath = await this.getLogFilePath(date);

    if (!logPath) {
      return null;
    }

    const readStream = fs.createReadStream(logPath);
    const gzip = zlib.createGzip();

    return readStream.pipe(gzip);
  }
}
