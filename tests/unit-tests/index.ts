import { NextFunction, Request, Response } from "express";

export const mockHandler = <T>({
  body,
  params,
}: {
  body?: T;
  params?: { [key: string]: string };
}) => {
  const req = { body, params } as Request;
  const res = mockResponse();
  const next: NextFunction = jest.fn();
  return { req, res, next };
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.sendStatus = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};
