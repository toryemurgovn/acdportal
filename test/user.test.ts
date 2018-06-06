import request from "supertest";
import app from "../src/app";

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
      .type("form")
      .field("email", "user@me.com")
      .field("password", "password")
      .expect(302)
      .end(function (err, res) {
        expect(res.error).not.toBeUndefined;
        done();
      });

  });
});

describe("POST /sign-up", () => {
  it("should return error message", (done) => {
    request(app).post("/sign-up")
      .set("accept", "json")
      .send({ email: "user@me.com", password: "password" })
      .end(function (err, res) {
        expect(res.error).not.toBeUndefined;
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
      .end(function (err, res) {
        expect(res.error).not.toBeUndefined;
        done();
      })
      .expect(200);

  });
});