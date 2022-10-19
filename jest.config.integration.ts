import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/integration-tests/**/**.test.ts"],
  verbose: false,
  collectCoverage: true,
};

export default config;
