import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerError, UserAlreadyExistsError } from '../errors';
import { Bcrypt } from '../helpers/bcrypt.class';
import { IUser, IUserLogin } from '../interfaces/IUser';
import IUserModel from '../interfaces/IUserModel';

class UserModel implements IUserModel {
  private readonly prisma: PrismaClient;
  private readonly bcrypt: Bcrypt = new Bcrypt();
  constructor (prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create (obj: IUser): Promise<string | null> {
    try {
      const hashedPassword = await this.bcrypt.generatePassword(obj.password);
      await this.prisma.user.create({
        data: {
          password: hashedPassword,
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
    const user = await this.prisma.user.findUnique({
      where: { username }
    });
    return user as IUser;
  };
}

// const teste = async (): Promise<any> => {
//   const db = new UserModel(new PrismaClient());
//   const handler = await db.create({ username: 'breno6g', password: 'jkldjasl' });
//   console.log(handler);
// };

// void teste();

export default UserModel;
