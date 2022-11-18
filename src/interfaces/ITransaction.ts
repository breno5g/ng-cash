interface ITransaction {
  creditedAccount: string
  debitedAccount: string
  value: number
  date: Date
}

interface ITransactionData {
  accountToDebit: string
  userAccountId: number
  transactionValue: number
}

export { ITransaction, ITransactionData };
