import { Router } from "express";
import { Dependencies } from "../app";
import userHandler from "../domain/user/user_handler";
import { verifyAPIKey } from "../mw";

export const appRoutes =
  ({ userRepository: userRepository }: Dependencies) =>
  (route: Router) => {
    route.post("/users", verifyAPIKey(), userHandler.createUser(userRepository));
    route.get("/users/:id", verifyAPIKey(), userHandler.getUser(userRepository));
    route.get("/users", verifyAPIKey(), userHandler.getUserList(userRepository));
    route.put("/users", verifyAPIKey(), userHandler.updateUser(userRepository));
    route.delete("/users/:id", verifyAPIKey(), userHandler.deleteUser(userRepository));
    return route;
  };
