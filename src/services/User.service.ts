import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';
import UserModel from '../models/User.model';

class UserService implements IUserService {
  private readonly model: IUserModel;
  constructor (model: IUserModel) {
    this.model = model;
  }

  public async create (obj: IUser): Promise<string | null> {
    try {
      const userAlreadyExists = await this.model.findOneByUsername(obj.username);
      if (userAlreadyExists != null) throw new Error('User already exists');
      await this.model.create(obj);
      return 'User created successfuly';
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async findOneByUsername (username: string): Promise<IUser | null> {
    try {
      const user = await this.model.findOneByUsername(username);
      return user;
    } catch (error: any) {
      throw new Error('Erro por definir');
    }
  }
}

// const teste = async (): Promise<any> => {
//   const db = new UserService(new UserModel(new PrismaClient()));
//   const handler = await db.create({ username: 'breno5g', password: 'password' });
//   console.log(handler);
// };

// void teste();

export { UserService };
