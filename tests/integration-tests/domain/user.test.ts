import { Express } from "express";
import supertest from "supertest";
import { reqUser } from "../../../src/domain/user/user";
import { mockAppIntegration, prismaClient } from "../index";

const mockReqUser: reqUser = {
  first_name: "Chandara",
  last_name: "Sin",
  email: "mockl@gmail.com",
  password: "secretpw@",
};

describe("User", () => {
  let app: Express;

  beforeAll(() => {
    app = mockAppIntegration();
  });

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  it("should return status ok when create user", () =>
    mockUserRequestHandler(app, mockReqUser)
      .expect(201)
      .then(res => expect(res.body.id).toBeDefined()));
});

const mockUserRequestHandler = (app: Express, user: reqUser) =>
  supertest(app).post("/api/users").set("Content-Type", "application/json").send(mockReqUser);
