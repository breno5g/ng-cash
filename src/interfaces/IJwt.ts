import { Jwt } from 'jsonwebtoken';
import { IUser } from './IUser';

type IJwt = Omit<IUser, 'password' | 'account'>;

interface IToken extends Jwt {
  data: { username: string, accountId: number }
}

export { IJwt, IToken };
