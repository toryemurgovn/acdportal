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

// describe("POST /sign-up", () => {
//   it("should return some defined error message with valid parameters", (done) => {
//     return request(app).post("/login")
//       .field("email", "john@me.com")
//       .field("password", "Hunter2")
//       .expect(302)
//       .end(function(err, res) {
//         expect(res.error).not.to.be.undefined;
//         done();
//       });

//   });
// });

describe("POST /sign-in", () => {
  it("should return some defined error message with valid parameters", (done) => {
    return request(app).post("/sign-in")
      .field("email", "john@me.com")
      .field("password", "Hunter2")
      .expect(302)
      .end(function(err, res) {
        expect(res.error).not.toBeUndefined;
        done();
      });

  });
});