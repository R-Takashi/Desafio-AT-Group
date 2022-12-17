"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_login_1 = __importDefault(require("../middlewares/validate.login"));
const validate_register_1 = __importDefault(require("../middlewares/validate.register"));
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.default();
userRouter.post('/login', validate_login_1.default, userController.login);
userRouter.post('/register', validate_register_1.default, userController.register);
exports.default = userRouter;
