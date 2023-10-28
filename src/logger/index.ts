import expressWinston, { requestWhitelist, responseWhitelist } from "express-winston";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint, json, colorize } = format;

const getTraceId = () => `TRD-${Math.floor(Math.random() * 10000000000)}`;

const logger = createLogger({
  level: "info",
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
  defaultMeta: { traceId: getTraceId() },
});

const mwLogger = expressWinston.logger({
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
  requestFilter: (req, propName) => {
    if (propName === "headers") {
      const { "accept-encoding": encoding, connection, accept, ...props } = req.headers;
      return props;
    }
    return req[propName];
  },
  requestWhitelist: [
    ...requestWhitelist.filter(req => !["httpVersion", "query", "url"].includes(req)),
  ],
  responseWhitelist: [...responseWhitelist],
  expressFormat: true,
  colorize: false,
  statusLevels: true,
});

export { logger, mwLogger };
