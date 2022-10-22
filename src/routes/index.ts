import { Router } from "express";
import { IAppDependencies } from "..";
import { createUserHandler } from "../domain/user/user.handler";
import { verifyAPIKey } from "../mw";

export const appRoutes = (dependencies: IAppDependencies) => (route: Router) => {
  route.post("/users", verifyAPIKey(), createUserHandler(dependencies.userService));
  return route;
};
