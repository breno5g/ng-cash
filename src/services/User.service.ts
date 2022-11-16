// import { PrismaClient } from '@prisma/client';
import { UserAlreadyExistsError } from '../errors';
import { IUser } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';
// import UserModel from '../models/User.model';

class UserService implements IUserService {
  private readonly model: IUserModel;
  constructor (model: IUserModel) {
    this.model = model;
  }

  public async create (obj: IUser): Promise<string | null> {
    const userAlreadyExists = await this.findOneByUsername(obj.username);
    if (userAlreadyExists) throw new UserAlreadyExistsError();
    await this.model.create(obj);
    return 'User created successfuly';
  }

  public async findOneByUsername (username: string): Promise<IUser | null> {
    const user = await this.model.findOneByUsername(username);
    return user;
  }
}

// const teste = async (): Promise<any> => {
//   const db = new UserService(new UserModel(new PrismaClient()));
//   const handler = await db.create({ username: 'breno5g', password: 'password' });
//   console.log(handler);
// };

// void teste();

export { UserService };
