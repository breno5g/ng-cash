import { IUser, IUserBalance, IUserLogin } from './IUser';

interface IUserService {
  create(obj: IUser): Promise<string | null>
  findOneByUsername(username: string): Promise<IUser | null>
  login(obj: IUser): Promise<IUserLogin | null>
  getBalance(username: string, token: string): Promise<IUserBalance | null>
}

export default IUserService;
