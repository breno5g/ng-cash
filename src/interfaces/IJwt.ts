import { IUser } from './IUser';

type IJwt = Omit<IUser, 'password' | 'accountId' | 'account'>;

export { IJwt };
