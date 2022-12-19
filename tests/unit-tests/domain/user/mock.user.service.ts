import { User } from "@prisma/client";
import { IUserService } from "../../../../src/domain/user/user.service";

export const mockUserService = (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): IUserService => {
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
