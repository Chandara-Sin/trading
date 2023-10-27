import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { logger } from "../../logger";
import { getPage, getRows, IPaginationParams, IPaginationRes } from "../../pagination";
import { reqUser, UserModel } from "./user";
import { IUserRepository } from "./user-repository";

const createUser =
  (repo: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: reqUser = req.body;
    try {
      const user = await repo.createUser(reqUser);
      res.status(201).send(new UserModel(user).toJson);
    } catch (err) {
      logger.error("create user err", err);
      next(err);
    }
  };

const getUser =
  (repo: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await repo.getUser(id);
      user
        ? res.status(200).json(new UserModel(user).toJson)
        : next(new Error("endpoint is not found"));
    } catch (err) {
      logger.error("get user err", err);
      next(err);
    }
  };

const updateUser =
  (repo: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: Pick<reqUser, "first_name" | "last_name"> & { id: string } = req.body;
    try {
      const user = await repo.updateUser(reqUser);
      res.status(200).json(new UserModel(user).toJson);
    } catch (err) {
      logger.error("update user err", err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? new Error("endpoint is not found")
          : err
      );
    }
  };

const deleteUser =
  (repo: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await repo.deleteUser(id);
      res.status(204).end();
    } catch (err) {
      logger.error("delete user err", err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? new Error(`User ID not found ${id}`)
          : err
      );
    }
  };

const getUserList =
  (svc: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const { page, rows, sort, direction, search } = req.query as {
      [key: string]: string | undefined;
    };
    const pag: IPaginationParams = {
      page: getPage(page),
      rows: getRows(rows),
      sort,
      direction,
      search,
    };
    try {
      const { total, data } = await svc.getUserList(pag);
      const userList: IPaginationRes = {
        total,
        rows: data.length,
        page: getPage(page),
        data: data.map(usr => new UserModel(usr).toJson),
      };
      res.status(200).send(userList);
    } catch (err) {
      logger.error("get user list err", err);
      next(err);
    }
  };

const userHandler = { createUser, getUser, updateUser, deleteUser, getUserList };
export default userHandler;
