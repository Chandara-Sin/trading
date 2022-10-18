import { NextFunction, Request, Response } from "express";
import { IAppDependencies } from "../..";
import { User } from "../../generated/client";
import { UserModel } from "./user";

export class UserHandler {
  constructor(private readonly dependencies: IAppDependencies) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body;
    try {
      const rs = await this.dependencies.userService.create(user);
      res.status(201).json(new UserModel(rs).toJson);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
}
