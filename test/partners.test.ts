import request from "supertest";
import app from "../src/app";
import User from "../src/models/User";

describe("Partner", () => {
  beforeAll((done) => {
    User.remove({}, () => {
      done();
    });
  });

  afterAll((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe("GET /sign-up-partner", () => {
    it("should return 200 OK", () => {
      return request(app).get("/sign-up-partner")
        .expect(200);
    });
  });

  describe("POST /sign-up-partner", () => {
    it("should return error message", (done) => {
      request(app).post("/sign-up-partner")
        .field("email", "partner@me.com")
        .field("password", "password")
        .end(function (error, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/sign-up-partner");
          done();
        });
    });
  });

  describe("POST /sign-up-partner", () => {
    it("should return 200", (done) => {
      request(app).post("/sign-up-partner")
        .set("accept", "json")
        .send({ email: "partner@me.com", password: "password", confirmPassword: "password" })
        .expect(200)
        .end(function (err, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/dashboard");
          done();
        });
    });
  });
});