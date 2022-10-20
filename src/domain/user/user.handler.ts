import { Handler, NextFunction, Request, Response } from "express";
import { IAppDependencies } from "../..";
import { logger } from "../../logger";
import { reqUser, UserModel } from "./user";

export const createUserHandler =
  (dependencies: IAppDependencies): Handler =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user: reqUser = req.body;
    try {
      const rs = await dependencies.userService.create(user);
      res.status(201).send(new UserModel(rs).toJson);
    } catch (err) {
      logger.error("create err", err);
      next(err);
    }
  };
