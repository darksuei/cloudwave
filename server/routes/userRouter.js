const Router = require("express").Router;

const userRouter = Router();

const {userLogin, userRegister} = require('../controllers/userController');

const {authenticate} = require('../utils/authenticate');

userRouter.post('/login', userLogin);

userRouter.post('/newuser', userRegister)

module.exports = userRouter;