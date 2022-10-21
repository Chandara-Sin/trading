import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, NextFunction, Request, Response, Router, urlencoded } from "express";
import { IAppDependencies } from ".";
import { mwLogger } from "./logger";
import { appRoutes } from "./routes";

const main = (dependencies: IAppDependencies) => {
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
  app.get("/api/healthz", (_, res: Response) => {
    res.status(200).json({ message: "Ok v1" });
  });

  app.use((error: unknown, _: Request, res: Response, __: NextFunction) =>
    res.status(500).json({
      status_code: 500,
      message: (error as Error).message,
    })
  );

  return app;
};

export { main };
