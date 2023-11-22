import { IUserRepository } from "../../../../src/domain/user/user-repository";
import { User } from "../../../../src/generated/client";
import { PrismaClientKnownRequestError } from "../../../../src/generated/client/runtime/library";

export const mockUserRepository = (
  user: Omit<User, "id" | "createdAt" | "updatedAt">
): IUserRepository => {
  const createUser = jest.fn().mockResolvedValue({
    ...user,
    id: "1",
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2023, 8, 10),
  });
  const getUser = jest.fn().mockResolvedValue(null),
    updateUser = jest
      .fn()
      .mockRejectedValue(
        new PrismaClientKnownRequestError("", { code: "P2025", clientVersion: "" })
      ),
    deleteUser = jest.fn(),
    getUserList = jest.fn();

  return { createUser, getUser, updateUser, deleteUser, getUserList };
};
