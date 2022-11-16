import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerError, UserAlreadyExistsError } from '../errors';
import { IUser } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';

class UserModel implements IUserModel {
  private readonly prisma: PrismaClient;
  constructor (prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create (obj: IUser): Promise<string | null> {
    try {
      await this.prisma.user.create({
        data: {
          password: obj.password,
          username: obj.username,
          account: {
            create: {
              balance: 100
            }
          }
        }
      });

      return 'ok';
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new UserAlreadyExistsError();
      }
      throw new InternalServerError();
    }
  }

  public async findOneByUsername (username: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username }
      });
      return user as IUser;
    } catch (error: any) {
      throw new InternalServerError();
    }
  };
}

// const teste = async (): Promise<any> => {
//   const db = new UserModel(new PrismaClient());
//   const handler = await db.create({ username: 'breno6g', password: 'jkldjasl' });
//   console.log(handler);
// };

// void teste();

export default UserModel;
