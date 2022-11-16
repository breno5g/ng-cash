class UserAlreadyExistsError extends Error {
  public status: number = 409;
  constructor () {
    super('User already exists');
  }
}

export default UserAlreadyExistsError;
