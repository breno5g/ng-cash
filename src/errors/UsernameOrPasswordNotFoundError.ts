class UsernameOrPasswordNotFoundError extends Error {
  public readonly status: number;
  constructor () {
    super('Username or Password not found');
    this.status = 400;
  }
}

export {
  UsernameOrPasswordNotFoundError
};
