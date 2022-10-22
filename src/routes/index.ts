import { Router } from "express";
import { IAppDependencies } from "..";
import { createUserHandler, getUserHandler } from "../domain/user/user.handler";
import { verifyAPIKey } from "../mw";

export const appRoutes = (dependencies: IAppDependencies) => (route: Router) => {
  route.post("/users", verifyAPIKey(), createUserHandler(dependencies.userService));
  route.get("/users/:id", verifyAPIKey(), getUserHandler(dependencies.userService));
  return route;
};
