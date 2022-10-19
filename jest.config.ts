import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/unit-tests/**/**.test.ts"],
  verbose: false, // Default: false or true if there is only one test file to run
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.ts", "!src/migration/**"],
};

export default config;
