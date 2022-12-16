import { INTEGER, STRING, DATE, BOOLEAN, Model } from "sequelize";
import database from '.';

export default class User extends Model {
  public id?: number;
  public nome?: string;
  public email?: string;
  public senha?: string;
  public avatar?: string;
  public data_de_nascimento?: Date;
  public ativo?: boolean;
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: STRING,
    allowNull: false,
  },
  avatar: {
    type: STRING,
    allowNull: true,
  },
  data_de_nascimento: {
    type: DATE,
    allowNull: false,
  },
  ativo: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize: database,
  underscored: true,
  tableName: 'Users',
  timestamps: false,
});