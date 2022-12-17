import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private _userService = new UserService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, senha } = req.body;

    const token = await this._userService.login(email, senha);

    return res.status(200).json({ token });
  };

  public register = async (req: Request, res: Response): Promise<Response> => {
    const register = req.body;

    const newUser = {
      ...register,
      dataDeNascimento: new Date(register.dataDeNascimento),
    };

    const createUser = await this._userService.register(newUser);

    return res.status(201).json(createUser);
  };
}