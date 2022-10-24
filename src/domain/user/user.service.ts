import { PrismaClient, User } from "../../generated/client";
import { reqUser } from "./user";

export interface IUserService {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (user: Pick<reqUser, "first_name" | "last_name"> & { id: string }) => Promise<User>;
  deleteUser: (id: string) => Promise<User>;
}

export class UserService implements IUserService {
  constructor(private readonly prisma: PrismaClient) {}

  createUser = async (user: reqUser) =>
    await this.prisma.user.create({
      data: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        hashedPassword: user.password,
      },
    });

  getUser = async (id: string) => await this.prisma.user.findUnique({ where: { id } });

  updateUser = async (user: Pick<reqUser, "first_name" | "last_name"> & { id: string }) =>
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });

  deleteUser = async (id: string) =>
    await this.prisma.user.delete({
      where: { id },
    });
}
