class UserAlreadyExistsError extends Error {
  public status: number;
  constructor () {
    super('User already exists');
    this.status = 409;
  }
}

export { UserAlreadyExistsError };
