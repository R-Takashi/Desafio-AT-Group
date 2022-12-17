import User from "../database/models/user.model";
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';
import { Register } from '../interfaces/IRegister';

export default class UserService {
  public _userModel = User;

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
  };

  public register = async (newUser: Register): Promise<string> => {

    const userExists = await this._userModel.findOne({ where: { email: newUser.email } });

    if (userExists) {
      throw new Error(ErrorTypes.UserAlreadyExists);
    }

    const senhaHash = await hash(newUser.senha, 8);
    

    await this._userModel.create({...newUser, senha: senhaHash});

    return "Usuário criado com sucesso";
  }

}