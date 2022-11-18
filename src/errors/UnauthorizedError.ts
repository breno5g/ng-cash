class UnauthorizedError extends Error {
  public status: number;
  constructor () {
    super('Unauthorized');
    this.status = 401;
  }
}

export { UnauthorizedError };
