import { Router } from  "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
import * as dashboardController from "../controllers/dashboard";
import * as assignmentController from "../controllers/assignment";
import * as codeController from "../controllers/code";
import * as configPassport from "../config/passport";
import * as partnerController from "../controllers/partner";
const router = Router();

// middleware that is specific to this router
router.use("/*", (req, res, next) => {
  console.log("frontend middleware");
  console.log("Time: ", Date.now());
  next();
});

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

router.get("/blockchain101/assignment/transaction", assignmentController.transaction);
router.get("/blockchain101/assignment/block", assignmentController.block);
router.get("/blockchain101/assignment/quiz", assignmentController.quiz);

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

module.exports = router;