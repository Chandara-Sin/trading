import { PrismaClient } from "../generated/client";

const DB = (): PrismaClient => new PrismaClient();

export { DB as initPrismaClient };
