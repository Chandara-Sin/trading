import express from "express";
import { userRoutes } from "./user.routes";

export const appRoutes = express.Router();

appRoutes.use("/users", userRoutes);
