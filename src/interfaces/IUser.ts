interface IUser {
  username: string
  password: string
  accountId?: number
}

interface IUserLogin { token: string, data: Omit<IUser, 'password'> };

export { IUser, IUserLogin };
