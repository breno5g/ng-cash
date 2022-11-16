import { IUser, IUserLogin } from './IUser';

interface IUserService {
  create(obj: IUser): Promise<string | null>
  findOneByUsername(username: string): Promise<IUser | null>
  login(obj: IUser): Promise<IUserLogin | null>
}

export default IUserService;
