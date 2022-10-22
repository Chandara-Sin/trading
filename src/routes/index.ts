import { Router } from "express";
import { IAppDependencies } from "..";
import { verifyAPIKey } from "../mw";
import { userRoutes } from "./user.routes";

export const appRoutes = (dependencies: IAppDependencies) => (route: Router) => {
  route.use("/users", verifyAPIKey(), userRoutes(dependencies.userService)(route));
  return route;
};
