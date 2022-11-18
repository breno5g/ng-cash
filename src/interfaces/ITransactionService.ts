interface ITransactionService {
  create(accountToDebit: string, transactionValue: number, token: string): Promise<string | null>
}

export default ITransactionService;
