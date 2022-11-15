/* eslint-disable @typescript-eslint/method-signature-style */
import { IUser } from './IUser';

interface IUserModel {
  create(obj: IUser): Promise<string | null>
  findOneByUsername(username: string): Promise<IUser | null>
}

export default IUserModel;
