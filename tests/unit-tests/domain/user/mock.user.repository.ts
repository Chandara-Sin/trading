import { User } from "@prisma/client";
import { IUserRepository } from "../../../../src/domain/user/user_repository";

export const mockUserRepository = (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): IUserRepository => {
  const createUser = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ...user,
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  );
  const getUser = jest.fn(),
    updateUser = jest.fn(),
    deleteUser = jest.fn(),
    getUserList = jest.fn();

  return { createUser, getUser, updateUser, deleteUser, getUserList };
};
