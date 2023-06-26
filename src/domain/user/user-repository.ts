import { PrismaClient, User } from "@prisma/client";
import { getDirection, IPaginationParams } from "../../pagination";
import { reqUser } from "./user";

export interface IUserRepository {
  createUser: (user: reqUser) => Promise<User>;
  getUser: (id: string) => Promise<User | null>;
  updateUser: (user: Pick<reqUser, "first_name" | "last_name"> & { id: string }) => Promise<User>;
  deleteUser: (id: string) => Promise<User>;
  getUserList: (pag: IPaginationParams) => Promise<{ data: User[]; total: number }>;
}

function userRepository(db: PrismaClient): IUserRepository {
  const createUser = async (user: reqUser) =>
    await db.user.create({
      data: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        hashedPassword: user.password,
      },
    });

  const getUser = async (id: string) => await db.user.findUnique({ where: { id } });

  const updateUser = async (user: Pick<reqUser, "first_name" | "last_name"> & { id: string }) =>
    await db.user.update({
      where: { id: user.id },
      data: {
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });

  const deleteUser = async (id: string) =>
    await db.user.delete({
      where: { id },
    });

  const getUserList = async (pag: IPaginationParams) => {
    const data = await db.user.findMany({
      skip: (pag.page - 1) * pag.rows,
      take: pag.rows,
      orderBy: {
        [pag.sort ?? "id"]: getDirection(pag.direction),
      },
    });
    const total = await db.user.count();
    return { data, total };
  };

  return { createUser, getUser, updateUser, deleteUser, getUserList };
}

export default userRepository;
