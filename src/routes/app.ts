import { Router } from "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
import * as dashboardController from "../controllers/dashboard";
import * as assignmentController from "../controllers/assignment";
import * as codeController from "../controllers/code";
import * as configPassport from "../config/passport";
import * as partnerController from "../controllers/partner";
import * as packagesController from "../controllers/packages";
import * as tpmController from "../controllers/tpm";
import * as apiAdminController from "../controllers/api/admin";

import * as middleware from "./middleware";
const router = Router();

/**
 * App routers handle
 */

router.get("/permission-denied", (req, res) => {
  res.redirect("/");
});

router.get("/", homeController.index);
router.get("/sign-out", userController.getLogout);
router.get("/sign-in", userController.signIn);
router.post("/sign-in", userController.postSignIn);
router.get("/sign-up", userController.signUp);
router.post("/sign-up", userController.postSignUp);

router.get("/dashboard", dashboardController.index);
router.get("/dashboard/profile", dashboardController.profile);
router.get("/dashboard/courses", dashboardController.courses);
router.get("/dashboard/packages", dashboardController.packages);
router.get("/dashboard/packages/:id", dashboardController.packageDetail);

router.get("/courses/:id/assignment/transaction", assignmentController.transaction);
router.post("/courses/:id/assignment/transaction/:id", assignmentController.transactionMechanisms);
router.get("/courses/:id/assignment/block", assignmentController.block);
router.get("/courses/:id/assignment/quiz", assignmentController.quiz);
router.post("/courses/:id/assignment/quiz", assignmentController.submitQuizzes);

/**
 * As User
 * View course
 */
router.use("/courses/:id", middleware.courseAccessMiddleware, (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/courses/:id/index", tpmController.viewCourseIndex);

// router.get("/data", tpmController.generateData);
// router.get("/view/course/:id", tpmController.viewCourse);
router.post("/apply-code", tpmController.applyCode);

router.get("/free-course", (req, res) => {
  res.send("free course page");
});

router.use("/pa/*", configPassport.isPartner, (req, res, next) => {
  console.log("Partner middleware");
  console.log("Time: ", Date.now());
  next();
});

router.get("/sign-up-partner", partnerController.application);
router.post("/sign-up-partner", partnerController.postApplication);

router.post("/pa/:id/gen", partnerController.generateCodePackage);

router.route("/api/packages")
  .post(packagesController.create)
  .get(packagesController.index);

router.route("/api/packages/:id")
  .get(packagesController.show);

router.use("/dashboard/admin/*",(req, res, next) => {
  if (req.user) {
    if (req.user.role !== "admin") {
      res.redirect("/dashoard/");
    }
    next();
  } else {
    res.redirect("/sign-in");
  }
});

router.get("/dashboard/admin/packages-request", tpmController.requestPackage);

router.use("/api/admin/*",(req, res, next) => {
  if (req.user) {
    if (req.user.role !== "admin") {
      res.status(403).send("Permission denied");
    }
    next();
  } else {
    res.status(403).send("Permission denied");
  }
});

router.post("/api/admin/package-status", apiAdminController.packageStatus);

module.exports = router;