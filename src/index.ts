import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { main } from "./app";
import { initPrismaClient } from "./config/db";
import { logger } from "./logger";
import userService, { IUserService } from "./domain/user/user.service";

const port = process.env.PORT ?? "8000";

export interface IAppDependencies {
  userService: IUserService;
}

export const initDependencies = (prismaClient: PrismaClient): IAppDependencies => ({
  userService: userService(prismaClient),
});

(() => {
  try {
    const prismaClient = initPrismaClient();
    const dependencies = initDependencies(prismaClient);
    const app = main(dependencies);

    app.listen(port, () => {
      console.info(
        `Server start at http://localhost:${port}\nEnvironment: ${
          process.env.NODE_ENV ?? "local"
        }\nTime: ${new Date().toISOString()}`
      );
    });
  } catch (err) {
    logger.error(err);
  }
})();
