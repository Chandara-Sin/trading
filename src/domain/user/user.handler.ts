import { Handler, NextFunction, Request, Response } from "express";
import { IAppDependencies } from "../..";
import { logger } from "../../logger";
import { reqUser, UserModel } from "./user";

export const createUserHandler =
  (dependencies: IAppDependencies): Handler =>
  (req: Request, res: Response, next: NextFunction) => {
    const user: reqUser = req.body;
    dependencies.userService
      .create(user)
      .then(rs => res.status(201).send(new UserModel(rs).toJson))
      .catch(err => {
        logger.error("create err", err);
        next(err);
      });
  };
