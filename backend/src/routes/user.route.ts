import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validate.login';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/login', validateLogin,  userController.login);

export default userRouter;