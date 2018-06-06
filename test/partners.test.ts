import request from "supertest";
import app from "../src/app";

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
      .end(function(err, res) {
        expect(res.error).not.toBeUndefined;
        done();
      })
      .expect(302);
  });
});

describe("POST /sign-up-partner", () => {
  it("should return 200", (done) => {
    request(app).post("/sign-up-partner")
      .set("accept", "json")
      .send({ email: "partner@me.com", password: "password", confirmPassword: "password" })
      .end(function (err, res) {
        expect(res.error).not.toBeUndefined;
        done();
      })
      .expect(200);
  });
});