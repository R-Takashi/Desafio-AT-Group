import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validate.login';
import {validateRegister, validateUpdateRegister} from '../middlewares/validate.register';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/login', validateLogin,  userController.login);

userRouter.post('/register', validateRegister, userController.register);

userRouter.patch('/register/update', validateUpdateRegister, userController.update);

userRouter.patch('/register/deactivate', userController.deactivate);

export default userRouter;