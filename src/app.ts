import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  Router,
  urlencoded,
} from "express";
import { initPrismaClient } from "./store/db";
import userRepository, { IUserRepository } from "./domain/user/user_repository";
import { mwLogger } from "./logger";
import { appRoutes } from "./routes";

export interface Dependencies {
  userRepository: IUserRepository;
}

export const initDependencies = (prismaClient: PrismaClient): Dependencies => ({
  userRepository: userRepository(prismaClient),
});

export const app = (dependencies: Dependencies): Express => {
  const app = express();
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(mwLogger);

  app.use("/api", appRoutes(dependencies)(Router()));
  app.get("/api/healthz", (_, res: Response) => res.status(200).json({ message: "Ok v1" }));

  app.use((error: unknown, _: Request, res: Response, __: NextFunction) =>
    res.status(500).json({
      status_code: 500,
      message: (error as Error).message,
    })
  );
  return app;
};

export const initServer = () => {
  const prismaClient = initPrismaClient();
  const dependencies = initDependencies(prismaClient);
  return app(dependencies);
};
