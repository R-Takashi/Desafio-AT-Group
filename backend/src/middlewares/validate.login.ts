import { NextFunction, Request, Response } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, senha } = req.body as Record<string, string>;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Todos os campos tem que ser preenchidos' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  next();
};

export default validateLogin;
