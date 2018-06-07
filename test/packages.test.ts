import request from "supertest";
import app from "../src/app";
import User from "../src/models/User";

describe("GET /dashboard/packages", () => {
  it("should return 302 redirect to login page", (done) => {
    request(app).get("/dashboard/packages")
      .expect(302)
      .end((error, response) => {
        expect(response.header.location).toBe("/sign-in");
        done();
      });
  });
});

describe("Dashboard", () => {
  let loginCookie = "(no login)";
  beforeAll((done) => {
    const user = new User({ email: "user@me.com", password: "password" });
    user.save(() => {
      request(app).post("/sign-in")
        .set("accept", "json")
        .send({ email: "user@me.com", password: "password" })
        .end(function (error, response) {
          if (error) {
            throw error;
          }
          loginCookie = response.header["set-cookie"];
          console.log("Get session cookie:");
          console.log(loginCookie);
          done();
        });
    });
  });

  afterAll((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe("GET /dashboard/packages", () => {
    console.log("Session cookie:");
    console.log(loginCookie);
    it("should return 200", (done) => {
      request(app).get("/dashboard/packages")
        .set("cookie", loginCookie)
        .end((error, response) => {
          expect(response.status).toBe(200);
          done();
        });
    });
  });

  // describe("GET /dashboard/profile", () => {
  //   console.log("Session cookie:");
  //   console.log(loginCookie);
  //   it("should return 200", (done) => {
  //     request(app).get("/dashboard/profile")
  //       .set("cookie", loginCookie)
  //       .end((error, response) => {
  //         expect(response.status).toBe(200);
  //         done();
  //       });
  //   });
  // });

  // describe("GET /dashboard/courses", () => {
  //   console.log("Session cookie:");
  //   console.log(loginCookie);
  //   it("should return 200", (done) => {
  //     request(app).get("/dashboard/courses")
  //       .set("cookie", loginCookie)
  //       .end((error, response) => {
  //         expect(response.status).toBe(200);
  //         done();
  //       });
  //   });
  // });

});