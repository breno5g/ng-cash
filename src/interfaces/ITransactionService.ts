import { ITransaction } from './ITransaction';
import { ITransactionFilter } from './ITransactionFilter';

interface ITransactionService {
  create(accountToDebit: string, transactionValue: number, token: string): Promise<string | null>
  getTransactions(token: string, filters: ITransactionFilter): Promise<ITransaction[]>

}

export default ITransactionService;
