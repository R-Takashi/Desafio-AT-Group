"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRegister = (req, res, next) => {
    const cadastro = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const bornDate = new Date(cadastro.dataDeNascimento);
    console.log(bornDate);
    const fieldChecks = [
        cadastro.nome.length < 2,
        !emailRegex.test(cadastro.email),
        cadastro.senha.length < 6,
        bornDate === null || !(bornDate instanceof Date),
    ];
    const fieldMessages = [
        'Nome deve ter no mínimo 2 caracteres',
        'Email inválido',
        'Senha deve ter no mínimo 6 caracteres',
        'Data de nascimento inválida',
    ];
    if (fieldChecks.some((check) => check)) {
        const index = fieldChecks.findIndex((check) => check);
        return res.status(400).json({ message: fieldMessages[index] });
    }
    next();
};
exports.default = validateRegister;
