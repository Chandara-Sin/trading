import { Handler, NextFunction, Request, Response } from "express";
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
