import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
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
  let req: Request, res: Response, next: NextFunction, userRepository: IUserRepository;
  beforeEach(() => {
    ({ req, res, next } = mockHandler(user));
    userRepository = mockUserRepository(user);
  });

  it("should call user repository", async () => {
    await userHandler.createUser(userRepository)(req, res, next);
    expect(userRepository.createUser).toBeCalledWith(user);
  });

  it("should response user", async () => {
    await userHandler.createUser(userRepository)(req, res, next);
    expect(res.status).lastCalledWith(201);
    expect(res.send).toBeCalledWith({
      id: "1",
      first_name: "dome",
      last_name: "me",
      email: "mock@gmail.com",
      created_at: new Date(2023, 8, 10),
      updated_at: new Date(2023, 8, 10),
    });
  });
});
