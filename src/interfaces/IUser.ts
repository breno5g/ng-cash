interface IUser {
  username: string
  password: string
  accountId?: number
  account?: { balance: number }
}

interface IUserLogin { token: string, data: Omit<IUser, 'password'> };

interface IUserBalance {
  balance: number
}

interface IUserWithToken {
  username: string
  token: string
}

export { IUser, IUserLogin, IUserBalance, IUserWithToken };
