import { NextFunction, Request } from "express-serve-static-core";
import { createUserHandler } from "../../../src/domain/user/user.handler";
import { User } from "../../../src/generated/client";
import { mockHandler, MockDependencies, MockResponse } from "..";

describe("User", () => {
  let req: Request, res: MockResponse, dependencies: MockDependencies, next: NextFunction;
  beforeEach(() => {
    ({ req, res, next, dependencies } = mockHandler());
  });

  const reqUser = {
    firstName: "Chandara",
    lastName: "Sin",
    email: "mockl@gmail.com",
    hashedPassword: "secretpw@",
  };

  it("should call user service", () => {
    dependencies.createUser(reqUser as User);
    createUserHandler(dependencies)(req, res as any, next);
    expect(dependencies.userService.create).toBeCalled();
  });

  it("should return user", async () => {
    req.body = reqUser;

    dependencies.createUser(reqUser as User);
    await createUserHandler(dependencies)(req, res as any, next);

    expect(res.status).lastCalledWith(201);
    expect(res.jsonBody()["id"]).toEqual(1);
  });
});
