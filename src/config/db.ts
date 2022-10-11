import { PrismaClient } from "../generated/client";

class DB {
  static client: PrismaClient;

  static initPrismaClient() {
    if (!DB.client) DB.client = new PrismaClient();
  }
}

export { DB };
