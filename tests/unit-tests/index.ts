import { NextFunction, Request } from "express";

export const mockHandler = () => {
  const req = {} as Request;
  const res = new MockResponse();
  const next: NextFunction = jest.fn();
  return { req, res, next };
};

export class MockResponse {
  status: any;
  send: any;

  constructor() {
    this.status = this.fnStatus();
    this.send = jest.fn();
  }

  fnStatus() {
    return jest.fn().mockReturnValue({
      send: jest.fn(),
    });
  }

  jsonBody() {
    return this.status().send.mock.calls[0][0];
  }
}
