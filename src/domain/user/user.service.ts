import { PrismaClient, User } from "../../generated/client";

export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  create = async (user: User) => this.prisma.user.create({ data: user });
}
