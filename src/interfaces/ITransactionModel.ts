import { ITransactionData } from './ITransaction';

interface ITransactionModel {
  create(obj: ITransactionData): Promise<string | null>
  // getTransactions(username: string): Promise<ITransaction[]>
}

export default ITransactionModel;
