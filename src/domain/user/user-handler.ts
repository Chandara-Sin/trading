import { NextFunction, Request, Response } from "express";
import { NotFound } from "../../exception";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime/library";
import { logger } from "../../logger";
import { IPaginationParams, IPaginationRes, getPage, getRows } from "../../pagination";
import { UserError, UserModel, reqUser } from "./user";
import { IUserRepository } from "./user-repository";

const createUser =
  (repo: IUserRepository) => async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: reqUser = req.body;
    try {
      const user = await repo.createUser(reqUser);
      res.status(201).send(new UserModel(user).toJson);
    } catch (err) {
      logger.error(UserError.Create, err);
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
        : next(NotFound({ code: UserError.Get, message: "endpoint is not found" }));
    } catch (err) {
      logger.error(UserError.Get, err);
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
      logger.error(UserError.Update, err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? NotFound({ code: UserError.Get, message: "endpoint is not found" })
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
      logger.error(UserError.Delete, err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? NotFound({ code: UserError.Get, message: "endpoint is not found" })
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
      logger.error(UserError.GetList, err);
      next(err);
    }
  };

const userHandler = { createUser, getUser, updateUser, deleteUser, getUserList };
export default userHandler;
