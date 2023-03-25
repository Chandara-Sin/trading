import { app } from "../../src/app";
import { initPrismaClient } from "../../src/store/db";
import { initDependencies } from "../../src/app";

export const prismaClient = initPrismaClient();

export const mockAppIntegration = () => {
  const dependencies = initDependencies(prismaClient);
  const server = app(dependencies);
  return server;
};
