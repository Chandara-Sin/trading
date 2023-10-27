import { NextFunction, Request, RequestHandler, Response } from "express";

export const verifyAPIKey =
  (): RequestHandler => (req: Request, _: Response, next: NextFunction) => {
    const apiKeyEncoded = Buffer.from(process.env.API_KEY_PUBLIC ?? "").toString("base64");
    const apiKeyHeader = req.get("X-API-KEY");
    next(
      apiKeyHeader !== apiKeyEncoded &&
        new Error("unauthorized access to this API. signature is invalid")
    );
  };
