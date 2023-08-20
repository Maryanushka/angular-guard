import { IToken } from './token.interface';

export interface IUserCredentials {
  email: string;
  password: string;
  token?: IToken;
}
