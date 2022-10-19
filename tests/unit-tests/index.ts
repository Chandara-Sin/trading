import { NextFunction, Request } from "express";
import { IAppDependencies } from "../../src";
import { User } from "../../src/generated/client";

export const mockHandler = () => {
  const req = {} as Request;
  const res = new MockResponse();
  const next: NextFunction = jest.fn();
  const dependencies = new MockDependencies();
  return { req, res, next, dependencies };
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

export class MockDependencies implements IAppDependencies {
  userService: any;

  constructor() {
    this.userService = {
      create: jest.fn(),
    };
  }

  createUser(user: User): User {
    return this.userService.create.mockResolvedValue({
      ...user,
      id: 1,
    });
  }
}
