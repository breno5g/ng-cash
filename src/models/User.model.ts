import { PrismaClient } from '@prisma/client';
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
      throw new Error('Não foi possivel criar o usuario');
    }
  }

  public findOneByUsername: (username: string) => Promise<IUser>;
}

// const teste = async (): Promise<any> => {
//   const db = new UserModel(new PrismaClient());
//   const handler = await db.create({ username: 'brenog', password: 'password' });
//   console.log(handler);
// };

// void teste();

export default UserModel;
