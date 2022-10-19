import { NextFunction, Request, Response } from "express";
import { IAppDependencies } from "../..";
import { User } from "../../generated/client";
import { reqUser, UserModel } from "./user";

export const createUser =
  (dependencies: IAppDependencies) => async (req: Request, res: Response, next: NextFunction) => {
    const user: reqUser = req.body;
    try {
      const rs = await dependencies.userService.create(user);
      res.status(201).send(new UserModel(rs).toJson);
    } catch (err) {
      console.error("create err", err);
      next(err);
    }
  };
