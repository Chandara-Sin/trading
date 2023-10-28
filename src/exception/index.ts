import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface IException extends Omit<Error, "name"> {
  code: string;
}

class errorResponse extends Error {
  constructor(readonly statusCode: number, readonly code: string, readonly message: string) {
    super();
  }
}

const errorResponseFactory =
  (statusCode: number) =>
  ({ code, message }: IException): errorResponse =>
    new errorResponse(statusCode, code, message);

const BadRequest = errorResponseFactory(400);
const Unauthorized = errorResponseFactory(401);
const NotFound = errorResponseFactory(404);
const MethodNotAllow = errorResponseFactory(405);

const errReqHandler: ErrorRequestHandler = (
  error: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) =>
  error instanceof errorResponse
    ? res.status(error.statusCode).json({
        code: error.code,
        message: error.message,
      })
    : res.status(500).json({
        code: "Internal Server Error",
        message: (error as Error).message,
      });

export { BadRequest, Unauthorized, NotFound, MethodNotAllow, errReqHandler };
