import { NextFunction, Request } from "express";

export const mockHandler = () => {
  const req = {} as Request;
  const res = new MockResponse();
  const next: NextFunction = jest.fn();
  return { req, res, next };
};

export class MockResponse {
  status: jest.Mock;
  send: jest.Mock;

  constructor() {
    this.status = jest.fn().mockReturnValue({
      send: jest.fn(),
    });
    this.send = jest.fn();
  }

  jsonBody() {
    return this.status().send.mock.calls[0][0];
  }
}
