"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize_1.STRING,
        allowNull: false,
    },
    avatar: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    data_de_nascimento: {
        type: sequelize_1.DATE,
        allowNull: false,
        field: 'data_de_nascimento',
    },
    ativo: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: _1.default,
    tableName: 'Users',
    modelName: 'User',
    timestamps: false,
    underscored: true,
});
