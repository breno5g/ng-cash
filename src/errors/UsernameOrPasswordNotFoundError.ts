class UsernameOrPasswordNotFoundError {
  public readonly status: number = 400;
  public message: string = 'Username or Password not found';
}

export {
  UsernameOrPasswordNotFoundError
};
