import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, Response, urlencoded } from "express";
import { IAppDependencies } from ".";
import { UserHandler } from "./domain/user/user.handler";

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

  const routes = express.Router();
  routes.post("/users", new UserHandler(dependencies).createUser);

  app.use("/api", routes);
  app.get("/api/healthz", (_, res: Response) => {
    res.status(200).json({ message: "Ok v1" });
  });

  return app;
};

export { main };
