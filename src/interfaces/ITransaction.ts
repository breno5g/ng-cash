interface ITransaction {
  creditedAccount: {
    User: {
      username: string
    }
  }
  debitedAccount: {
    User: {
      username: string
    }
  }
  value: number
  createdAt: Date
}

interface ITransactionData {
  accountToDebit: string
  userAccountId: number
  transactionValue: number
}

export { ITransaction, ITransactionData };
