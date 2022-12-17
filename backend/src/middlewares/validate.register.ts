import { NextFunction, Request, Response } from 'express';
import { Register } from '../interfaces/IRegister';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const cadastro = req.body as Register;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const bornDate = new Date(cadastro.dataDeNascimento);
  
  const fieldChecks = [
    cadastro.nome.length < 2,
    !emailRegex.test(cadastro.email),
    cadastro.senha.length < 6,
    !(bornDate instanceof Date && !isNaN(bornDate.getTime())) ,
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

export default validateRegister;
