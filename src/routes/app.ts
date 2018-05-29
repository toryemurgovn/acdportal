import { Router } from  "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
const router = Router();

// middleware that is specific to this router
router.use("/*", (req, res, next) => {
  console.log("frontend middleware");
  console.log("Time: ", Date.now());
  next();
});

router.get("/", homeController.index);
router.get("/sign-in", homeController.signIn);
router.get("/sign-up", homeController.signUp);

module.exports = router;