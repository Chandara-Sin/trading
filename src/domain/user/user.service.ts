import { PrismaClient, User } from "../../generated/client";
import { reqUser } from "./user";

export interface IUserService {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
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
}
