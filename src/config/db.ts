import { PrismaClient } from "@prisma/client";

const DB = (): PrismaClient => new PrismaClient();

export { DB as initPrismaClient };
