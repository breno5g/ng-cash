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

  public async findOneByUsername (username: string): Promise<IUser | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username }
      });
      return user as IUser;
    } catch (error) {
      throw new Error('Erro por definir');
    }
  };
}

// const teste = async (): Promise<any> => {
//   const db = new UserModel(new PrismaClient());
//   const handler = await db.findOneByUsername('breno5g');
//   console.log(handler);
// };

// void teste();

export default UserModel;
