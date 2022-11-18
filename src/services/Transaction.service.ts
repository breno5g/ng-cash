import { UnauthorizedError } from '../errors';
import JWT from '../helpers/jwt.class';
import ITransactionModel from '../interfaces/ITransactionModel';
import ITransactionService from '../interfaces/ITransactionService';

class TransactionService implements ITransactionService {
  private readonly model: ITransactionModel;
  private readonly jwt: JWT = new JWT();

  constructor (model: ITransactionModel) {
    this.model = model;
  }

  public async create (accountToDebit: string, transactionValue: number, token: string): Promise<string | null> {
    const user = this.jwt.validateToken(token);
    if (!user?.data.accountId) throw new UnauthorizedError();
    const res = await this.model.create({ accountToDebit, transactionValue, userAccountId: user.data.accountId });
    return res;
  }
}

// const teste = async (): Promise<void> => {
//   try {
//     const service = new TransactionService(new TransactionModel(new PrismaClient()));
//     const res = await service.create('breno5g', 400, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdGUiLCJhY2NvdW50SWQiOjF9LCJpYXQiOjE2Njg3ODAxMjUsImV4cCI6MTY2ODg2NjUyNX0.3RznDK-OzcOJ5XUNIT7AaGkI5svpPhPC0ay2Drv-Ric');
//     console.log(res);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// void teste();

export { TransactionService };
