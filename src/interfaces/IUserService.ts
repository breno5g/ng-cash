import { IUser } from './IUser';

interface IUserService {
  create(obj: IUser): Promise<string | null>
  findOneByUsername(username: string): Promise<IUser | null>
}

export default IUserService;
