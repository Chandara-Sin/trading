import { PrismaClient, User } from "../../generated/client";
import { getDirection, getPage, IPaginationParams } from "../../pagination";
import { reqUser } from "./user";

export interface IUserService {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (user: Pick<reqUser, "first_name" | "last_name"> & { id: string }) => Promise<User>;
  deleteUser: (id: string) => Promise<User>;
  getUserList: (pag: IPaginationParams) => Promise<{ data: User[]; total: number }>;
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

  getUserList = async (pag: IPaginationParams) => {
    const data = await this.prisma.user.findMany({
      skip: (pag.page - 1) * pag.rows,
      take: pag.rows,
      orderBy: {
        [pag.sort ?? "id"]: getDirection(pag.direction),
      },
    });
    const total = await this.prisma.user.count();
    return { data, total };
  };
}
