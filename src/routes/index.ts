import { Router } from "express";
import { IAppDependencies } from "..";
import {
  createUserHandler,
  getUserHandler,
  getUserListHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../domain/user/user.handler";
import { verifyAPIKey } from "../mw";

export const appRoutes = (dependencies: IAppDependencies) => (route: Router) => {
  route.post("/users", verifyAPIKey(), createUserHandler(dependencies.userService));
  route.get("/users/:id", verifyAPIKey(), getUserHandler(dependencies.userService));
  route.get("/users", verifyAPIKey(), getUserListHandler(dependencies.userService));
  route.put("/users", verifyAPIKey(), updateUserHandler(dependencies.userService));
  route.delete("/users/:id", verifyAPIKey, deleteUserHandler(dependencies.userService));
  return route;
};
