const authenticate = require("../middlewares/authenticate");
const getUser = require("../controllers/userControllers/getUser");
const patchUpdateUser = require("../controllers/userControllers/patchUpdateUser");
const postForgotPassword = require("../controllers/userControllers/postForgotPassword");
const postResetPassword = require("../controllers/userControllers/postResetPassword");
const postUserGoogleLogin = require("../controllers/userControllers/postUserGoogleLogin");
const postUserLogin = require("../controllers/userControllers/postUserLogin");
const postUserRegister = require("../controllers/userControllers/postUserRegister");

const router = require("express").Router();

router.post("/newuser", postUserRegister);

router.post("/login", postUserLogin);

router.post("/google_login", postUserGoogleLogin);

router.post("/forgot_password", postForgotPassword);

router.post("/reset_password/:_id/:token", postResetPassword);

router.get("/user", authenticate, getUser);

router.patch("/update", authenticate, patchUpdateUser);

module.exports = router;
