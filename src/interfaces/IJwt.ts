import { IUser } from './IUser';

type IJwt = Omit<IUser, 'password'>;

export { IJwt };
