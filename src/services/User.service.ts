import { UserAlreadyExistsError, UsernameOrPasswordNotFoundError } from '../errors';
import { Bcrypt } from '../helpers/bcrypt.class';
import JWT from '../helpers/jwt.class';
import { IUser, IUserLogin } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';
import IUserService from '../interfaces/IUserService';

// import { PrismaClient } from '@prisma/client';
// import UserModel from '../models/User.model';

class UserService implements IUserService {
  private readonly model: IUserModel;
  private readonly bcrypt: Bcrypt = new Bcrypt();
  private readonly jwt: JWT = new JWT();

  constructor (model: IUserModel) {
    this.model = model;
  }

  public async create (obj: IUser): Promise<string | null> {
    const userAlreadyExists = await this.findOneByUsername(obj.username);
    if (userAlreadyExists) throw new UserAlreadyExistsError();
    const hashedPassword = await this.bcrypt.generatePassword(obj.password);

    await this.model.create({ ...obj, password: hashedPassword });
    return 'User created successfuly';
  }

  public async findOneByUsername (username: string): Promise<IUser | null> {
    const user = await this.model.findOneByUsername(username);
    return user;
  }

  public async login (obj: IUser): Promise<IUserLogin | null> {
    const user = await this.findOneByUsername(obj.username);
    if (!user) throw new UsernameOrPasswordNotFoundError();

    const isValidPassword = await this.bcrypt.comparePassword(obj.password, user.password);
    if (!isValidPassword) throw new UsernameOrPasswordNotFoundError();

    const { username, accountId } = user;
    const token = this.jwt.generateToken({ username, accountId });

    return {
      data: { username, accountId },
      token
    };
  }
}

// const teste = async (): Promise<any> => {
//   try {
//     const db = new UserService(new UserModel(new PrismaClient()));
//     const handler = await db.login({ username: 'breno6g', password: '@Teste01' });
//     console.log(handler);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// void teste();

export { UserService };
