import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, Response, urlencoded } from "express";
import { appRoutes } from "./routes/app.routes";

const main = () => {
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

  app.use("/api", appRoutes);

  app.get("/api/healthz", (_, res: Response) => {
    res.status(200).json({ message: "Ok v1" });
  });

  return app;
};

export { main };
