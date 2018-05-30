import { Router } from  "express";

// Controllers (route handlers)
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
const router = Router();

// middleware that is specific to this router
router.use("/*", (req, res, next) => {
  console.log("frontend middleware");
  console.log("Time: ", Date.now());
  next();
});

router.get("/", homeController.index);
router.get("/signup", userController.register);
router.post("/signup", userController.postRegister);
router.get("/login", userController.getLogin);
router.get("/logout", userController.getLogout);
router.post("/login", userController.postLogin);

module.exports = router;