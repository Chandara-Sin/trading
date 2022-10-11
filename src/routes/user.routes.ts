import express from "express";
import { userController } from "../controllers/user.controllers";

export const userRoutes = express.Router();

userRoutes.post("", userController.createUser);
