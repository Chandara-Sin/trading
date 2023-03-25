import { User } from "@prisma/client";
import { NextFunction, Request } from "express";
import { mockHandler } from "../../";
import userHandler from "../../../../src/domain/user/user_handler";
import { IUserRepository } from "../../../../src/domain/user/user_repository";
import { mockUserRepository } from "./mock.user.repository";

const user: Omit<User, "id" | "createdAt" | "updatedAt"> = {
  firstName: "dome",
  lastName: "me",
  email: "mock@gmail.com",
  hashedPassword: "mock123",
};

describe("Create User", () => {
  let req: Request, res: any, next: NextFunction, userRepository: IUserRepository;
  beforeEach(() => {
    ({ req, res, next } = mockHandler());
    userRepository = mockUserRepository(user);
  });

  it("should call user repository", async () => {
    await userHandler.createUser(userRepository)(req, res, next);
    expect(userRepository.createUser).toBeCalled();
  });

  it("should return user", async () => {
    await userHandler.createUser(userRepository)(req, res, next);
    expect(res.status).lastCalledWith(201);
    expect(res.jsonBody()["id"]).toEqual("1");
  });
});
