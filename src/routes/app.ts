import { Router } from  "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
import * as assignmentController from "../controllers/assignment";
const router = Router();

// middleware that is specific to this router
router.use("/*", (req, res, next) => {
  console.log("frontend middleware");
  console.log("Time: ", Date.now());
  next();
});

router.get("/", homeController.index);
// router.get("/logout", userController.getLogout);
router.get("/sign-in", userController.signIn);
router.post("/sign-in", userController.postSignIn);
router.get("/sign-up", userController.signUp);
router.post("/sign-up", userController.postSignUp);

router.get("/blockchain101/assignment/transaction", assignmentController.transaction);
router.get("/blockchain101/assignment/block", assignmentController.block);
router.get("/blockchain101/assignment/quiz", assignmentController.quiz);

module.exports = router;