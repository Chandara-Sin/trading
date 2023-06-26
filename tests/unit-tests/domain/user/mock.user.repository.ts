import { User } from "@prisma/client";
import { IUserRepository } from "../../../../src/domain/user/user-repository";

export const mockUserRepository = (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): IUserRepository => {
  const createUser = jest.fn().mockResolvedValue({
    ...user,
    id: "1",
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2023, 8, 10),
  });
  const getUser = jest.fn(),
    updateUser = jest.fn(),
    deleteUser = jest.fn(),
    getUserList = jest.fn();

  return { createUser, getUser, updateUser, deleteUser, getUserList };
};
