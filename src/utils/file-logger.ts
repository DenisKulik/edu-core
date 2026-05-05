import fs from "fs";
import path from "path";

const currentDate = new Date().toISOString().split("T")[0];
const logsDir = path.join(process.cwd(), "logs");
const logFile = path.join(logsDir, `access-${currentDate}.log`);

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const writeLog = (message: string) => {
  const log = `${new Date().toISOString()} ${message}\n`;

  fs.appendFile(logFile, log, (err) => {
    if (err) {
      console.error("Log write error:", err);
    }
  });
};
