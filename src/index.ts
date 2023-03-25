import "dotenv/config";
import { initServer } from "./app";
import { logger } from "./logger";

const port = process.env.PORT ?? "8000";

(() => {
  const server = initServer();
  server
    .listen(port, () => {
      console.info(
        `Server start at http://localhost:${port}\nEnvironment: ${
          process.env.NODE_ENV ?? "local"
        }\nTime: ${new Date().toISOString()}`
      );
    })
    .on("error", err => {
      logger.debug(err);
      logger.error(err);
    });
})();
