import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { mockHandler } from "../../";
import userHandler from "../../../../src/domain/user/user-handler";
import { IUserRepository } from "../../../../src/domain/user/user-repository";
import { mockUserRepository } from "./mock.user.repository";
import { NotFound } from "../../../../src/exception";
import { UserError } from "../../../../src/domain/user/user";

const user: Omit<User, "id" | "createdAt" | "updatedAt"> = {
  firstName: "dome",
  lastName: "me",
  email: "mock@gmail.com",
  hashedPassword: "mock123",
};

describe("User", () => {
  let req: Request, res: Response, next: NextFunction, userRepository: IUserRepository;
  beforeEach(() => {
    ({ req, res, next } = mockHandler({
      body: user,
      params: { id: "fd2644b2-f943-403b-9c0f-173b15fa6060" },
    }));
    userRepository = mockUserRepository(user);
  });

  describe("Create User", () => {
    it("should call user repository", async () => {
      await userHandler.createUser(userRepository)(req, res, next);
      expect(userRepository.createUser).toBeCalledWith(user);
    });

    test("User should be able to register", async () => {
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

  describe("Get User", () => {
    it("should inform User to register first before login", async () => {
      await userHandler.getUser(userRepository)(req, res, next);
      expect(next).toBeCalledWith(
        NotFound({ code: UserError.Get, message: "endpoint is not found" })
      );
    });
  });
});
