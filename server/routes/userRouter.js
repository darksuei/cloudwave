const Router = require("express").Router;

const userRouter = Router();

const {
  userLogin,
  userRegister,
  userUpdate,
  getUser,
  userGoogleLogin,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const { authenticate } = require("../utils/authenticate");

userRouter.get("/user", authenticate, getUser);

userRouter.post("/login", userLogin);

userRouter.post("/forgot_password", forgotPassword);

userRouter.post("/reset_password/:_id/:token", resetPassword);

userRouter.post("/newuser", userRegister);

userRouter.post("/google_login", userGoogleLogin);

userRouter.patch("/update", authenticate, userUpdate);

module.exports = userRouter;
