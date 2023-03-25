import { Router } from "express";
import { IAppDependencies } from "../app";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUserListHandler,
  updateUserHandler,
} from "../domain/user/user.handler";
import { verifyAPIKey } from "../mw";

export const appRoutes =
  ({ userService }: IAppDependencies) =>
  (route: Router) => {
    route.post("/users", verifyAPIKey(), createUserHandler(userService));
    route.get("/users/:id", verifyAPIKey(), getUserHandler(userService));
    route.get("/users", verifyAPIKey(), getUserListHandler(userService));
    route.put("/users", verifyAPIKey(), updateUserHandler(userService));
    route.delete("/users/:id", verifyAPIKey(), deleteUserHandler(userService));
    return route;
  };
