import { createLogger, transports, format } from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const { combine, timestamp, json, prettyPrint } = format;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "log.txt");

if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "", { flag: "wx" });
}

const logger = createLogger({
  level: "error",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    prettyPrint()
  ),
  transports: [new transports.File({ filename: logFilePath })],
});

export default logger;
