import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, Response, Router, urlencoded } from "express";
import { IAppDependencies } from ".";
import { createUserHandler } from "./domain/user/user.handler";
import { mwLogger } from "./logger";

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

  const routes = Router();
  routes.post("/users", createUserHandler(dependencies));

  app.use("/api", routes);
  app.get("/api/healthz", (_, res: Response) => {
    res.status(200).json({ message: "Ok v1" });
  });

  return app;
};

export { main };
