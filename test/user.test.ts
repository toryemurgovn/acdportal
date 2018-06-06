import request from "supertest";
import app from "../src/app";
import User from "../src/models/User";

describe("User", () => {
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

  describe("GET /sign-in", () => {
    it("should return 200 OK", (done) => {
      request(app).get("/sign-in")
        .expect(200, done);
    });
  });

  describe("GET /sign-up", () => {
    it("should return 200 OK", () => {
      return request(app).get("/sign-up")
        .expect(200);
    });
  });

  describe("POST /sign-in", () => {
    it("should return error message with invalid account", (done) => {
      return request(app).post("/sign-in")
        .set("accept", "json")
        .send({ email: "user@me.com", password: "password123" })
        .end(function (error, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/sign-in");
          done();
        });

    });
  });

  describe("POST /sign-up", () => {
    it("should return error message", (done) => {
      request(app).post("/sign-up")
        .set("accept", "json")
        .send({ email: "user@me.com", password: "password" })
        .end(function (error, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/sign-up");
          done();
        })
        .expect(302);

    });
  });

  describe("POST /sign-up", () => {
    it("should return 200", (done) => {
      request(app).post("/sign-up")
        .set("accept", "json")
        .send({ email: "user@me.com", password: "password", confirmPassword: "password" })
        .end(function (error, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/");
          done();
        })
        ;
    });
  });

  describe("POST /sign-in", () => {
    it("should return error message with invalid account", (done) => {
      request(app).post("/sign-in")
        .set("accept", "json")
        .send({ email: "user@me.com", password: "password" })
        .end(function (error, response) {
          expect(response.status).toBe(302);
          expect(response.header.location).toBe("/dashboard");
          done();
        });
    });
  });
});