import { NextFunction, Request } from "express-serve-static-core";
import { mockHandler, MockResponse } from "..";
import { createUserHandler } from "../../../src/domain/user/user.handler";
import { IUserService } from "../../../src/domain/user/user.service";
import { User } from "../../../src/generated/client";
import { MockUserService } from "../domain/mock.user.service";

const user = {
  firstName: "dome",
  lastName: "me",
  email: "mock@gmail.com",
  hashedPassword: "mock123",
};

describe("User", () => {
  let req: Request, res: MockResponse, next: NextFunction, userService: IUserService;
  beforeEach(() => {
    ({ req, res, next } = mockHandler());
    userService = new MockUserService(user as User);
  });

  it("should call user service", async () => {
    await createUserHandler(userService)(req, res as any, next);
    expect(userService.createUser).toBeCalled();
  });

  it("should return user", async () => {
    await createUserHandler(userService)(req, res as any, next);
    expect(res.status).lastCalledWith(201);
    expect(res.jsonBody()["id"]).toEqual("1");
  });
});
