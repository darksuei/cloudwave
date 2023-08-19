const Router = require("express").Router;

const userRouter = Router();

const {userLogin, userRegister, userUpdate, getUser} = require('../controllers/userController');

const {authenticate} = require('../utils/authenticate');

userRouter.get('/user', authenticate, getUser);

userRouter.post('/login', userLogin);

userRouter.post('/newuser', userRegister)

userRouter.patch('/update', authenticate, userUpdate);

module.exports = userRouter;