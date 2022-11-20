class UserAlreadyExistsError {
  public status: number = 409;
  public message: string = 'User already exists';
}

export default UserAlreadyExistsError;
