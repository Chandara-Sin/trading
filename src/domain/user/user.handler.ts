import { Handler, NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "../../generated/client/runtime";
import { logger } from "../../logger";
import { reqUser, UserModel } from "./user";
import { IUserService } from "./user.service";

export const createUserHandler =
  (userService: IUserService): Handler =>
  (req: Request, res: Response, next: NextFunction) => {
    const user: reqUser = req.body;
    userService
      .createUser(user)
      .then(rs => res.status(201).send(new UserModel(rs).toJson))
      .catch(err => {
        logger.error("create user err", err);
        next(err);
      });
  };

export const getUserHandler =
  (userService: IUserService): Handler =>
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    userService
      .getUser(id)
      .then(rs =>
        rs
          ? res.status(200).json(new UserModel(rs).toJson)
          : next(new Error(`User ID not found ${id}`))
      )
      .catch(err => {
        logger.error("get user err", err);
        next(err);
      });
  };

export const updateUserHandler =
  (userService: IUserService): Handler =>
  (req: Request, res: Response, next: NextFunction) => {
    const user: Pick<reqUser, "first_name" | "last_name"> & { id: string } = req.body;
    userService
      .updateUser(user)
      .then(rs => res.status(200).json(new UserModel(rs).toJson))
      .catch(err => {
        logger.error("update user err", err);
        next(
          err instanceof PrismaClientKnownRequestError && err.code === "P2025"
            ? new Error(`User ID not found ${user.id}`)
            : err
        );
      });
  };

export const deleteUserHandler =
  (userService: IUserService): Handler =>
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    userService
      .deleteUser(id)
      .then(() => res.status(200).json({ status: "ok" }))
      .catch(err => {
        logger.error("delete user err", err);
        next(
          err instanceof PrismaClientKnownRequestError && err.code === "P2025"
            ? new Error(`User ID not found ${id}`)
            : err
        );
      });
  };
