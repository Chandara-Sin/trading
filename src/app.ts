import { PrismaClient } from "./generated/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, Response, Router, urlencoded } from "express";
import userRepository, { IUserRepository } from "./domain/user/user-repository";
import { errReqHandler } from "./exception";
import { mwLogger } from "./logger";
import { appRoutes } from "./routes";
import { initPrismaClient } from "./store/db";

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
  app.use(errReqHandler);
  return app;
};

export const initServer = () => {
  const prismaClient = initPrismaClient();
  const dependencies = initDependencies(prismaClient);
  return app(dependencies);
};
