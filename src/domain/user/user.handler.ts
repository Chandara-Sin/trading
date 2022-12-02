import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime";
import { logger } from "../../logger";
import { getPage, getRows, IPaginationParams, IPaginationRes } from "../../pagination";
import { reqUser, UserModel } from "./user";
import { IUserService } from "./user.service";

export const createUserHandler =
  (svc: IUserService) => async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: reqUser = req.body;
    try {
      const user = await svc.createUser(reqUser);
      res.status(201).send(new UserModel(user).toJson);
    } catch (err) {
      logger.error("create user err", err);
      next(err);
    }
  };

export const getUserHandler =
  (svc: IUserService) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await svc.getUser(id);
      user
        ? res.status(200).json(new UserModel(user).toJson)
        : next(new Error(`User ID not found ${id}`));
    } catch (err) {
      logger.error("get user err", err);
      next(err);
    }
  };

export const updateUserHandler =
  (svc: IUserService) => async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: Pick<reqUser, "first_name" | "last_name"> & { id: string } = req.body;
    try {
      const user = await svc.updateUser(reqUser);
      res.status(200).json(new UserModel(user).toJson);
    } catch (err) {
      logger.error("update user err", err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? new Error(`User ID not found ${reqUser.id}`)
          : err
      );
    }
  };

export const deleteUserHandler =
  (svc: IUserService) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await svc.deleteUser(id);
      res.status(200).json({ status: "ok" });
    } catch (err) {
      logger.error("delete user err", err);
      next(
        err instanceof PrismaClientKnownRequestError && err.code === "P2025"
          ? new Error(`User ID not found ${id}`)
          : err
      );
    }
  };

export const getUserListHandler =
  (svc: IUserService) => async (req: Request, res: Response, next: NextFunction) => {
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
