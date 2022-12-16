import User from "../database/models/user.model";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';

export default class UserService {
  private _userModel = User;

  public login = async (email: string, senha: string): Promise<string> => {

    const user = await this._userModel.findOne({ where: { email } }) as User;

    if (!user) {
      throw new Error(ErrorTypes.UserNotFound);
    }

    const passwordMatched = await compare(senha, user.senha || '');

    if (!passwordMatched) {
      throw new Error(ErrorTypes.IncorrectPassword);
    }

    const token = sign({ email: user.email, userName: user.nome }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return token as string;
  }

}