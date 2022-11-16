import { UnauthoridError, UserAlreadyExistsError, UsernameOrPasswordNotFoundError } from '../errors';
import { Bcrypt } from '../helpers/bcrypt.class';
import JWT from '../helpers/jwt.class';
import { IUser, IUserBalance, IUserLogin } from '../interfaces/IUser';
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

    const { username, accountId, account } = user;
    const token = this.jwt.generateToken({ username, accountId });

    return {
      data: { username, account },
      token
    };
  }

  public async getBalance (username: string, token: string): Promise<IUserBalance | null> {
    const user = await this.model.findOneByUsername(username);
    const data = this.jwt.validateToken(token)?.data;

    if (user?.accountId !== data?.accountId) throw new UnauthoridError();

    if (user?.account) {
      const { balance } = user.account;
      return { balance };
    }

    return null;
  }
}

// const teste = async (): Promise<any> => {
//   try {
//     const db = new UserService(new UserModel(new PrismaClient()));
//     const handler = await db.getBalance('breno6g', 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYnJlbm82ZyIsImFjY291bnRJZCI6MTB9LCJpYXQiOjE2Njg2MDUxNTYsImV4cCI6MTY2ODY5MTU1Nn0.AqtQTPwZchTFLEH096uFMJuqVLJaVYkJAi-RevRksXw');
//     console.log(handler);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// void teste();

export { UserService };
