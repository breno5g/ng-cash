import { ITransaction, ITransactionData } from './ITransaction';
import { ITransactionFilter } from './ITransactionFilter';

interface ITransactionModel {
  create(obj: ITransactionData): Promise<string | null>
  getTransactions(userId: number, filters: ITransactionFilter): Promise<ITransaction[]>
}

export default ITransactionModel;
