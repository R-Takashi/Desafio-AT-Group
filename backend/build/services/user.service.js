"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const catalog_1 = require("../errors/catalog");
class UserService {
    constructor() {
        this._userModel = user_model_1.default;
        this.login = (email, senha) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userModel.findOne({ where: { email } });
            if (!user) {
                throw new Error(catalog_1.ErrorTypes.UserNotFound);
            }
            const passwordMatched = yield (0, bcryptjs_1.compare)(senha, user.senha || '');
            if (!passwordMatched) {
                throw new Error(catalog_1.ErrorTypes.IncorrectPassword);
            }
            const token = (0, jsonwebtoken_1.sign)({ email: user.email, userName: user.nome }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });
            return token;
        });
        this.register = (newUser) => __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this._userModel.findOne({ where: { email: newUser.email } });
            if (userExists) {
                throw new Error(catalog_1.ErrorTypes.UserAlreadyExists);
            }
            console.log(newUser);
            const user = yield this._userModel.create(Object.assign({}, newUser));
            return user;
        });
    }
}
exports.default = UserService;
