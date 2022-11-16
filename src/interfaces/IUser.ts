import { Jwt } from 'jsonwebtoken';

interface IUser {
  username: string
  password: string
  accountId?: number
}

interface IUserLogin { token: Jwt, data: Omit<IUser, 'password'> };

export { IUser, IUserLogin };
