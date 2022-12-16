"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatalog = exports.ErrorTypes = void 0;
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["UserNotFound"] = "UserNotFound";
    ErrorTypes["IncorrectPassword"] = "IncorrectPassword";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
exports.errorCatalog = {
    UserNotFound: {
        message: 'Usuário não encontrado',
        status: 404,
    },
    IncorrectPassword: {
        message: 'Senha incorreta',
        status: 401,
    },
};
