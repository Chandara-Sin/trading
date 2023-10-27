import { Router } from "express";
import { Dependencies } from "../app";
import userHandler from "../domain/user/user-handler";
import { verifyAPIKey } from "../mw";

export const appRoutes =
  ({ userRepository: userRepo }: Dependencies) =>
  (router: Router) => {
    router.post("/users", verifyAPIKey(), userHandler.createUser(userRepo));
    router.get("/users/:id", verifyAPIKey(), userHandler.getUser(userRepo));
    router.get("/users", verifyAPIKey(), userHandler.getUserList(userRepo));
    router.put("/users", verifyAPIKey(), userHandler.updateUser(userRepo));
    router.delete("/users/:id", verifyAPIKey(), userHandler.deleteUser(userRepo));
    return router;
  };
