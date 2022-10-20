import { NextFunction, Request, Response } from "express";

export const verifyAPIKey = () => (req: Request, res: Response, next: NextFunction) => {
  const apiKeyEncoded = Buffer.from(process.env.API_KEY_PUBLIC ?? "").toString("base64");
  const apiKeyHeader = req.get("X-API-KEY");
  next(
    !apiKeyHeader
      ? new Error("Missing API Key")
      : apiKeyHeader !== apiKeyEncoded && new Error("API Key not correct")
  );
};
