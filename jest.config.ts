import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/unit-tests/**/**.test.ts"],
  verbose: true,
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.ts", "!src/migration/**"],
};

export default config;
