import { Router } from "express";
import { Dependencies } from "../app";
import userHandler from "../domain/user/user_handler";
import { verifyAPIKey } from "../mw";

export const appRoutes =
  ({ userRepository: userService }: Dependencies) =>
  (route: Router) => {
    route.post("/users", verifyAPIKey(), userHandler.createUser(userService));
    route.get("/users/:id", verifyAPIKey(), userHandler.getUser(userService));
    route.get("/users", verifyAPIKey(), userHandler.getUserList(userService));
    route.put("/users", verifyAPIKey(), userHandler.updateUser(userService));
    route.delete("/users/:id", verifyAPIKey(), userHandler.deleteUser(userService));
    return route;
  };
