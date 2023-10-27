import { Router } from "express";
import { Dependencies } from "../app";
import userHandler from "../domain/user/user-handler";
import { verifyAPIKey } from "../mw";

export const appRoutes =
  ({ userRepository: userRepo }: Dependencies) =>
  (router: Router) => {
    router
      .route("/users/:id")
      .all(verifyAPIKey())
      .get(userHandler.getUser(userRepo))
      .delete(userHandler.deleteUser(userRepo));
    router
      .route("/users")
      .all(verifyAPIKey())
      .post(userHandler.createUser(userRepo))
      .get(userHandler.getUserList(userRepo))
      .put(userHandler.updateUser(userRepo));
    return router;
  };
