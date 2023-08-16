const Router = require("express").Router;

const userRouter = Router();

const {userLogin, userRegister} = require('../controllers/userController');

userRouter.post('/login', userLogin);

userRouter.post('/newuser', userRegister)

module.exports = userRouter;