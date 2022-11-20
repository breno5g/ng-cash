import { UnauthorizedError } from '../errors';
import JWT from '../helpers/jwt.class';
import { ITransaction } from '../interfaces/ITransaction';
import { ITransactionFilter } from '../interfaces/ITransactionFilter';
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

  public async getTransactions (token: string, filters: ITransactionFilter): Promise<ITransaction[]> {
    const { data: { accountId } } = this.jwt.validateToken(token) as any;
    const res = await this.model.getTransactions(accountId, filters);

    return res;
  }
}

// const teste = async (): Promise<void> => {
//   try {
//     const service = new TransactionService(new TransactionModel(new PrismaClient()));
//     const res = await service.getTransactions('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYnJlbm81ZyIsImFjY291bnRJZCI6MX0sImlhdCI6MTY2ODg5NDczNywiZXhwIjoxNjY4OTgxMTM3fQ.sytStrlTPVPno6a5Ohs8GG3moXnkfUInDoQdXVPb3jw', { date: '2022-11-19', 'cash-out': true });
//     console.log(res);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// };

// void teste();

export { TransactionService };
