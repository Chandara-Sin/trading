import { NextFunction, Request, RequestHandler, Response } from "express";
import { MethodNotAllow, Unauthorized } from "../exception";

enum AuthError {
  Unauthorized = "TRD-AUTH-0001",
  Forbidden = "TRD-AUTH-0002",
  MethodNotAllow = "TRD-AUTH-0002",
}

const verifyAPIKey = (): RequestHandler => (req: Request, _: Response, next: NextFunction) => {
  const apiKeyEncoded = Buffer.from(process.env.API_KEY_PUBLIC ?? "").toString("base64");
  const apiKeyHeader = req.get("X-API-KEY");
  next(
    apiKeyHeader !== apiKeyEncoded &&
      Unauthorized({
        code: AuthError.Unauthorized,
        message: "unauthorized access to this API. signature is invalid",
      })
  );
};

const grantMethod = (): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = req.route.methods;
  const reqMethod = req.method.toLowerCase();
  if (req.route && !allowedMethods[reqMethod]) {
    res.set("Allow", Object.keys(allowedMethods).slice(1).join(", ").toUpperCase());
    next(
      MethodNotAllow({
        code: AuthError.MethodNotAllow,
        message: "method not allow",
      })
    );
  } else {
    next();
  }
};

export { verifyAPIKey, grantMethod };
