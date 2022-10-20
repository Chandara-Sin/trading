import { PrismaClient, User } from "../../generated/client";
import { reqUser } from "./user";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  create = async (user: reqUser) =>
    await this.prisma.user.create({
      data: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        hashedPassword: user.password,
      },
    });
}
