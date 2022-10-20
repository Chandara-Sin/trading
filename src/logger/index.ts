import expressWinston, { requestWhitelist, responseWhitelist } from "express-winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, json, colorize } = format;

export const logger = createLogger({
  level: "info",
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});

export const mwLogger = expressWinston.logger({
  format: combine(json(), timestamp(), colorize(), prettyPrint()),
  transports: [new transports.Console()],
  requestWhitelist: [
    ...requestWhitelist.filter(req => req != "httpVersion" && req != "query"),
    "body",
  ],
  responseWhitelist: [...responseWhitelist, "body"],
  expressFormat: true,
  colorize: false,
});
