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

    return res.status(201).json({ token: createUser });
  };

  public getUser = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;

    const user = await this._userService.getUser(token);

    return res.status(200).json(user);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;
    const update = req.body;

    const updatedUser = await this._userService.update(update, token);

    return res.status(200).json(updatedUser);
  }

  public deactivate = async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers.authorization;

    const deactivatedUser = await this._userService.deactivate(token);

    return res.status(201).json(deactivatedUser);
  };

}