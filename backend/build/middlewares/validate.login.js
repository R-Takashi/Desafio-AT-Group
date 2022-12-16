"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLogin = (req, res, next) => {
    const { email, senha } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email || !senha) {
        return res.status(400).json({ message: 'Todos os campos tem que ser preenchidos' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido' });
    }
    next();
};
exports.default = validateLogin;
