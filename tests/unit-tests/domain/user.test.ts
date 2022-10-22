import { NextFunction, Request } from "express-serve-static-core";
import { mockHandler, MockResponse } from "..";
import { reqUser } from "../../../src/domain/user/user";
import { createUserHandler } from "../../../src/domain/user/user.handler";
import { IUserService } from "../../../src/domain/user/user.service";
import { User } from "../../../src/generated/client";

export class MockUserService implements IUserService {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;

  constructor() {
    this.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: "1",
        firstName: "Chandara",
        lastName: "Sin",
        email: "mock@gmail.com",
        hashedPassword: "secretpw@",
      } as User)
    );
    this.getUser = jest.fn();
  }
}

describe("User", () => {
  let req: Request, res: MockResponse, next: NextFunction, userService: IUserService;
  beforeEach(() => {
    ({ req, res, next } = mockHandler());
    userService = new MockUserService();
  });

  it("should call user service", async () => {
    // await dependencies.createUser(user as reqUser);

    await createUserHandler(userService)(req, res as any, next);
    expect(userService.createUser).toBeCalled();
  });

  // it("should return user", async () => {
  //   req.body = reqUser;

  //   dependencies.createUser(reqUser as User);
  //   await createUserHandler(dependencies)(req, res as any, next);

  //   expect(res.status).lastCalledWith(201);
  //   expect(res.jsonBody()["id"]).toEqual("1");
  // });
});
