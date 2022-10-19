import { main } from "../../src/app";
import { initPrismaClient } from "../../src/config/db";
import { initDependencies } from "../../src/index";

export const prismaClient = initPrismaClient();

export const mockAppIntegration = () => {
  const dependencies = initDependencies(prismaClient);
  const app = main(dependencies);

  return app;
};
