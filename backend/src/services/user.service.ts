import User from "../database/models/user.model";
import { compare, hash } from 'bcryptjs';
import { sign, decode } from 'jsonwebtoken';
import { ErrorTypes } from '../errors/catalog';
import { Register } from '../interfaces/IRegister';
import { UpdateRegister } from '../interfaces/IUpdateRegister';

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

    const token = sign({ id: user.id, email: user.email, userName: user.nome }, process.env.JWT_SECRET as string, {
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
    

    const createdUser = await this._userModel.create({...newUser, senha: senhaHash});

    const token = sign({ id: createdUser.id, email: createdUser.email, userName: createdUser.nome }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return token as string;
  }

  public getUser = async (token: string | undefined): Promise<User> => {
    const userDecoded = decode(token as string) as any;
    console.log(userDecoded);
    

    const { id } = userDecoded;


    const user = await this._userModel.findOne({ 
      where: { id } ,
      attributes: { exclude: ['senha'] }
    }) as User;

    if (!user) {
      throw new Error(ErrorTypes.UserNotFound);
    }

    return user;
  };

  public update = async (update: UpdateRegister, token: string | undefined): Promise<string> => {
      
      const { id } = decode(token as string) as { id: number };
  
      const user = await this._userModel.findOne({ where: { id } }) as User;
  
      if (!user) {
        throw new Error(ErrorTypes.UserNotFound);
      }
  
      const senhaHash = (update.senha) ? await hash(update.senha, 8) : user.senha;

      const updatedUser = {
        nome: update.nome ? update.nome : user.nome,
        senha: senhaHash,
        avatar: update.avatar ? update.avatar : user.avatar
      }
  
      await this._userModel.update({ ...updatedUser }, { where: { id } });
  
      return "Usu??rio atualizado com sucesso";
  }

  public deactivate = async (token: string | undefined): Promise<string> => {
    const { id } = decode(token as string) as { id: number };

    const user = await this._userModel.findOne({ where: { id } }) as User;

    if (!user) {
      throw new Error(ErrorTypes.UserNotFound);
    }

    await this._userModel.update({ ativo: false }, { where: { id } });

    return "Usu??rio desativado com sucesso";
  }

}