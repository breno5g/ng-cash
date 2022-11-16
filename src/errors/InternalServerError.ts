class InternalServerError extends Error {
  public status: number;
  constructor () {
    super('Interal server error');
    this.status = 500;
  }
}

export { InternalServerError };
