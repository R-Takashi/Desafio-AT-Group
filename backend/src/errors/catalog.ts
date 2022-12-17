export enum ErrorTypes {
  UserNotFound = 'UserNotFound',
  IncorrectPassword = 'IncorrectPassword',
  UserAlreadyExists = 'UserAlreadyExists',
}

type ErrorResponseObject = {
  message: string;
  status: number;
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  UserNotFound: {
    message: 'Usuário não encontrado',
    status: 404,
  },
  IncorrectPassword: {
    message: 'Senha incorreta',
    status: 401,
  },
  UserAlreadyExists: {
    message: 'Email já cadastrado',
    status: 409,
  },
};