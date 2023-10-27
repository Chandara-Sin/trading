import { NextFunction, Request, RequestHandler, Response } from "express";

const verifyAPIKey = (): RequestHandler => (req: Request, _: Response, next: NextFunction) => {
  const apiKeyEncoded = Buffer.from(process.env.API_KEY_PUBLIC ?? "").toString("base64");
  const apiKeyHeader = req.get("X-API-KEY");
  next(
    apiKeyHeader !== apiKeyEncoded &&
      new Error("unauthorized access to this API. signature is invalid")
  );
};

const grantMethod = (): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = req.route.methods;
  const reqMethod = req.method.toLowerCase();
  if (req.route && !allowedMethods[reqMethod]) {
    res.set("Allow", Object.keys(allowedMethods).slice(1).join(", ").toUpperCase());
    res.status(405).send({
      status_code: 405,
      message: "method not allow",
    });
  } else {
    next();
  }
};

export { verifyAPIKey, grantMethod };
