import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../domain/user/user.handler";
import { IUserService } from "../domain/user/user.service";

export const userRoutes = (userService: IUserService) => (route: Router) => {
  route.post("", createUserHandler(userService));
  route.get("/:id", getUserHandler(userService));
  route.put("", updateUserHandler(userService));
  route.delete("/:id", deleteUserHandler(userService));
  return route;
};
