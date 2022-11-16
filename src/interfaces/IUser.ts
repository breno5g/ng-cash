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

export { IUser, IUserLogin, IUserBalance };
